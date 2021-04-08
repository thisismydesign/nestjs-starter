import { FC } from 'react';
import type { AppProps } from 'next/app';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div style={{ display: 'flex', maxWidth: 1100 }}>
      <div style={{ flexBasis: '70%', margin: 25 }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
