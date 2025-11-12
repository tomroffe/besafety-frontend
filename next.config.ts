import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";


const config: NextConfig = {
  output: "standalone",
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/registration',
  //       permanent: true,
  //     },
  //   ]
  // },
};

export default withFlowbiteReact(config);

