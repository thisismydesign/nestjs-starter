// Workaround related to: https://github.com/vercel/next.js/issues/29788
// Has to be here to avoid errors during Nest compilation
type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};
