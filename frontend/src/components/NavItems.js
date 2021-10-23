import React from 'react';
import {ImInfo,ImProfile,ImHome} from 'react-icons/im';

export const Navitems = [
    {   
        id: "1",
        title: 'Home',
        path: '/home',
        icon: <ImHome/>,
    },
    {
        id: "2",
        title: 'Profile',
        path: '/profile',
        icon: <ImProfile/>,
    },
    {
        id: "3",
        title: 'About',
        path: '/about',
        icon: <ImInfo/>,
    },
]