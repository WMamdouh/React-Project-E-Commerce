import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';

export default function Home() {



    return (
        <>
            <CategoriesSlider />
            <RecentProducts />
        </>
    )
}