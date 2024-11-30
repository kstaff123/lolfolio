import rivensplashart from "./assets/rivensplashart.jpg";

export function Background(){
    return(<div className="relative">
        <div
          className="absolute z-0 h-[24rem] w-[36rem] bg-cover  bg-center left-[50%] translate-x-[-50%] translate-y-[15%] "
          style={{
            backgroundImage: `radial-gradient(circle, 
        rgba(51, 50, 80, 0) 0%, 
        rgba(51, 50, 80, .7) 80%, 
        rgba(51, 50, 80, .8) 80%, 
        rgba(51, 50, 80, 1) 100%),
      linear-gradient(to top, rgba(51, 50, 80, .95), rgba(51, 50, 80, 0)),
      linear-gradient(to right, rgba(51, 50, 80, .95), rgba(51, 50, 80, 0)),
      linear-gradient(to bottom, rgba(51, 50, 80, .2), rgba(51, 50, 80, 0)),
      linear-gradient(to left, rgba(51, 50, 80, .95), rgba(51, 50, 80, 0)),
      url("${rivensplashart}")`,
            willChange: "transform",
            imageRendering: "pixelated",
          }}
        ></div>
      </div>);
}