import React from "react";

type Prop = {
  time: {
    hr: string;
    min?: string;
    sec?: string;
  };
};
function Clock({ time }: Prop) {
  return (
    <section>
      <div className="rounded-[50%] my-10 mx-5 h-[40vh] w-[40vh] flex justify-center items-center bg-primary p-3 text-4xl ">
        <h1 className=" font-bold">
          {time.hr ? time.hr + " : " : ""}{" "}
          {time.min ? `${time.min} : ` : "00 : "}
          {time.sec ? time.sec : "00"}
        </h1>
      </div>
    </section>
  );
}

export default Clock;
