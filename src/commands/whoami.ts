const whoamiObj = {
  message: [
    [
      "I'm Tanya, a second-year student at a multimedia engineering school (IMAC).",
      "I'm currently looking for a 6-month internship starting January 20 2025. ",
      "I'm mainly looking for work in the fields of video game programming and web development. ",
      "During my studies, I worked on a number of projects that gave me a wide range of skills",
      "that I'm sure I'll be able to put to good use during my internship. - ",
    ] /* 
    [
      "Amidst cosmic whispers,",
      "I navigate the maze of self-discovery,",
      "echoing the eternal refrain - "
    ],
    [
      "In the symphony of life,",
      "I am a note inquiring its own melody,",
      "harmonizing with the universal query - ",
    ],
    [
      "As stardust contemplating its journey,",
      "I ponder the cosmic query,",
      "silently asking - ",
    ],
    [
      "In the tapestry of reality,",
      "I am the thread of self-inquiry,",
      "weaving through the eternal question - "
    ], */,
  ],
};

export const createWhoami = (): string[] => {
  const whoami: string[] = [];
  const r = Math.floor(Math.random() * whoamiObj.message.length);
  whoami.push("<br>");

  whoamiObj.message[r].forEach((ele, idx) => {
    if (idx === whoamiObj.message[r].length - 1) {
      ele += "<span class='command'>who am I?</span>";
    }
    whoami.push(ele);
  });

  whoami.push("<br>");

  return whoami;
};
