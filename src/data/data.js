

export const handleFetch = async (url, InputData, API_KEY) => 
{
  try 
  {
    const response = await fetch(`${url}?q=${InputData}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
  } 
  catch (e) 
  {
    console.error(`Se ha producido un error: ${e}`);
    return null;
  }
};

