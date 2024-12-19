//request access to grab secret from secretsmanager
 const grabSecret = async () => {
  try{
    const response = await fetch("https://js1cchjb8l.execute-api.us-east-1.amazonaws.com/prod/grabSecretValue", {
    method:"GET",
    redirect:"follow"
    })
    return response.text();
  }catch(error){
    console.error("Failed to fetch data: ", error);
  }
}

//parses JSON content when retrieving from AWS secrets manager and returns the key values
export const secret = async () => {
  const response = await grabSecret();
  const secretP1 = JSON.parse(response);
  const secretP2 = JSON.parse(secretP1);
  return secretP2;
}
