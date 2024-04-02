import command from "../../config.json" assert { type: "json" };

const createProject = (): string[] => {
  let string = "";
  const projects: string[] = [];
  const files = `${command.projects.length} File(s)`;
  const SPACE = "&nbsp;";

  projects.push("<br>");

  command.projects.forEach((ele) => {
    let link = `<table><tr><td class="project_title"><a href="${ele[2]}" target="_blank">${ele[0]}</a> <br> ${ele[3]}<br> ${ele[4]}</td>`;
    string += SPACE.repeat(2);
    string += link;
    string += SPACE.repeat(75 - ele[0].length);
    string += `<td class="project_desc">${ele[1]}</td></tr></table>`;
    projects.push(string);
    string = "";
  });

  projects.push("<br>");
  projects.push(files);
  projects.push("<br>");
  return projects;
};

export const PROJECTS = createProject();
