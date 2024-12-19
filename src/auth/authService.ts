import { CognitoIdentityProviderClient, InitiateAuthCommand, RespondToAuthChallengeCommand, RespondToAuthChallengeCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import config from "./config.json";
type AuthFlowType = 'USER_PASSWORD_AUTH' | 'REFRESH_TOKEN_AUTH' | 'CUSTOM_AUTH' | 'ADMIN_NO_SRP_AUTH';
type ChallengeNameType = "NEW_PASSWORD_REQUIRED"
export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signIn = async (username: string, password: string) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    console.log("RESPONSE: ", response);
    if(response.ChallengeName === "NEW_PASSWORD_REQUIRED"){
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("session", response.Session || '');
    } else{
      const {AuthenticationResult} = response;
      if (AuthenticationResult) {
        sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
        sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
        sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
        return AuthenticationResult;
      }
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const handleNPChallenge = async (password:string) => {
    const params : RespondToAuthChallengeCommandInput = {
      ChallengeName: "NEW_PASSWORD_REQUIRED" as ChallengeNameType,
      ClientId: config.clientId,
      ChallengeResponses: {
        USERNAME: sessionStorage.getItem("username"),
        NEW_PASSWORD: password
      },
      Session: sessionStorage.getItem("session") 
    };

    try{
      const command = new RespondToAuthChallengeCommand(params);
      const response = await cognitoClient.send(command);
      console.log('password changed:', response);
      sessionStorage.removeItem('session');
    }
    catch(error){
      console.error('Error changing password: ', error);
    }
}

