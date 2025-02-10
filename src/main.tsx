import React from 'react';
import { createRoot } from 'react-dom/client';
import MyApp from './App';

import { useIonRouter } from '@ionic/react';
import { App } from '@capacitor/app';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);