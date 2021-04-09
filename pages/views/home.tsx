import Head from 'next/head';
import * as React from 'react';

const Home = (props) => {
  // console.log(props);
  const { title } = props;
  return (
    <section className="page-section">
      <Head>
        <title>{title}</title>
      </Head>

      <h1>Hello World from Next JS</h1>
      <div className="container mx-auto">
        <p>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti et
            eos sit vero ab laborum nulla culpa, quis neque ex, voluptatum,
            eveniet amet autem obcaecati animi ratione quo officiis at!
          </span>
          <span>
            Voluptas obcaecati et adipisci quasi omnis dolores odio eos hic modi
            voluptatum ratione ullam sequi aspernatur ducimus exercitationem
            possimus, sint rem officiis esse recusandae, eveniet laborum
            repellat. Ipsum, culpa reprehenderit.
          </span>
          <span>
            Facilis deleniti dolore neque excepturi hic, tempora dolores
            repellat ipsum quis nihil! Dolor sapiente asperiores laborum aperiam
            necessitatibus obcaecati adipisci temporibus itaque optio saepe
            similique perspiciatis nulla ullam, voluptatibus praesentium?
          </span>
        </p>
      </div>
    </section>
  );
};

Home.getInitialProps = (res) => {
  const { query } = res;
  return { ...query };
};

export default Home;
