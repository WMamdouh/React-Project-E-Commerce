import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useProduct() {

    async function getRecentProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    const responseObject = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts,
        staleTime: 5 * 60 * 1000,    //~ 5 minutes
        retry: 3,                   //~ Retry failed requests up to 3 times
    });

  return responseObject;
}
