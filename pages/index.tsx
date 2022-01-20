import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import logo from "../public/logo.svg";
import header from "../public/header.svg";
import footer from "../public/footer.svg";
import { Product } from "../product/types";
import React from "react";

interface Props {
  products: Product[];
}

const Home: NextPage<Props> = ({ products }) => {
  const [cart, setcart] = React.useState<Product[]>([]);
  const [showModal, setShowModal] = React.useState<Boolean>(false);
  const total = React.useMemo(
    () => cart.reduce((total, product) => total + product.price, 0),
    [cart]
  );
  return (
    <div className="container pl-8">
      <nav className="flex bg-black sticky top-0 z-50 items-center justify-between flex-wrap w-full p-6">
        <Image alt="Basement supply" src={logo} />
        <div>
          <a
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white hover:text-black mt-4 lg:mt-0"
            onClick={() => setShowModal(true)}
          >
            Cart ({cart.length})
          </a>
        </div>
      </nav>
      <header>
        <Image src={header} alt="header" />
        <div className="overflow-x-hidden border-t-2 border-b-2">
          <div className="py-2 animate-marquee whitespace-nowrap">
            <span className="text-2xl mx-4">
              {" "}
              A man cant have enough basement swag{" "}
            </span>
            <span className="text-2xl mx-4">
              {" "}
              A man cant have enough basement swag{" "}
            </span>
            <span className="text-2xl mx-4">
              {" "}
              A man cant have enough basement swag{" "}
            </span>
            <span className="text-2xl mx-4">
              {" "}
              A man cant have enough basement swag{" "}
            </span>
          </div>
        </div>
      </header>
      <div className="container text-center">
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="cursor-pointer"
              onClick={() => setcart((cart) => cart.concat(product))}
            >
              <div className="bg-gradient-to-t from-gray-900 to-black">
                <Image
                  width={440}
                  height={600}
                  alt={product.name}
                  layout="responsive"
                  src={product.image}
                />
              </div>
              <div className="grid pt-3 grid-cols-3 border-white border-t-2 gap-4">
                <span className="col-start-0 col-end-1"> {product.name} </span>
                <span className="col-end-7 col-span-2">$ {product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <Image alt="Wear everyday" src={footer} />
      </footer>
      {showModal ? (
        <>
          <div className="absolute top-0 left-0 items-center inset-0 z-50 focus:outline-none">
            <div className="absolute right-4 w-auto my-6 mx-auto max-w-screen-md border border-white ">
              {/*content*/}
              <div className="shadow-lg relative flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col p-5">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white h-8 block outline-none focus:outline-none">
                      CLOSE
                    </span>
                  </button>
                  <h3 className="text-center text-4xl font-semibold">
                    YOUR CART
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {cart.map((cart, index) => (
                    <div
                      className="flex flex-row cursor-pointer"
                      key={index}
                      onClick={() =>
                        setcart((cart) =>
                          cart.filter((_, _index) => index !== _index)
                        )
                      }
                    >
                      <h2> {cart.name} </h2>
                      <h2 className="absolute right-0 pr-4">
                        {" "}
                        $ {cart.price}{" "}
                      </h2>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex flex-row place-content-around justify-center h-20  border-t">
                  <div className="w-3/5 border-r text-2xl text-left p-6">
                    {" "}
                    <h1> TOTAL: $ {total} </h1>{" "}
                  </div>
                  <div className="w-auto text-center text-2xl p-6">
                    <h2> CHECKOUT </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props, any> = async () => {
  const products: Product[] = await import("../product/mock.json").then(
    (res) => res.default
  );
  return {
    props: {
      products,
    },
  };
};
