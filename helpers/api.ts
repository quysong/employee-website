import { zappyEndpoint } from "constants/common";

export const sendRequest = async (url: string, options: any) => {
  options = {
    ...options,
    headers: {
      ...options.headers,
    },
  }

  if (options.method == 'POST') {

    options = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }
  }

  try {
    const fetchRequest = await fetch(`${zappyEndpoint}/${url}`, options).then((response) => {
      console.log(zappyEndpoint)
      return response
    }).then((response) => {
      return response.json()
    }).catch((e) => {
      return {
        status: 'error',
        description: 'Error when call api'
      }
    });

    return fetchRequest;
  } catch (error) {
    return {
      status: 'error',
      description: 'Error when call api 1'
    };
  }
}
