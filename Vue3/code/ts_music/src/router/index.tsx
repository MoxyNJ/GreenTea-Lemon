import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

// 一级路由
const Discover = lazy(() => import('@/views/discover'));
const Mine = lazy(() => import('@/views/mine'));
const Focus = lazy(() => import('@/views/focus'));
const Player = lazy(() => import('@/views/player'));
// const Download = lazy(() => import('@/views/download'));

// Discover下二级路由
const Ranking = lazy(() => import('@/views/discover/views/ranking'));
const Recommend = lazy(() => import('@/views/discover/views/recommend'));
const Songs = lazy(() => import('@/views/discover/views/songs'));
const Djradio = lazy(() => import('@/views/discover/views/djradio'));
const Artist = lazy(() => import('@/views/discover/views/artist'));
const Album = lazy(() => import('@/views/discover/views/album'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/album',
        element: <Album />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/player',
    element: <Player />
  }
  // {
  //   path: '/download',
  //   element: <Download />
  // }
];

export default routes;
