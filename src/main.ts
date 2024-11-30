$(document).ready(function () {
  console.log("Hello World"); // Confirm script execution
  let jsonSection: any[] = [];
  let sections = ["whoami", "academics", "skills", "projects", "contact"];

  for (let i = 0; i < sections.length; i++) {
    console.log(`Processing section: ${sections[i]}`);
    createSection(sections[i]);
    console.log(`Section created: ${sections[i]}`);

    getDataHTML(sections[i]);
    console.log(`HTML data loaded for: ${sections[i]}`);

    const jsonData = getDataJSON(sections[i]); // Wait for JSON data
    console.log(`JSON data loaded for: ${sections[i]}`, jsonData);

    /* jsonSection.push(jsonData);
    setDataDiv(jsonSection[i], sections[i]);
    console.log(`Data set for: ${sections[i]}`); */
  }
});

// Function to create divs for the sections
function createSection(name: string) {
  console.log(`Creating section div for: ${name}`);
  $("#content-container").append('<div id="' + name + '" class="content"></div>');
}

//Function to get the data from the other HTML file
function getDataHTML(name: string) {
  $.get("./src/sections/" + name + ".html", function (data) {
    console.log("./src/sections/" + name + ".html");
    console.log("Data: " + data);
    $("#" + name).html(data);
    console.log("Data loaded: " + name);
  });
}

//function to get the data from a JSON file
async function getDataJSON(name: string) {
  return await $.getJSON("./src/json/" + name + ".json", function (data) {
    console.log("Data loaded from ./src/json/" + name + ".json");
    return data;
  });
}

// Function to add the content of the JSON into a div
async function setDataDiv(data: any, name: string, content: string = "", lang: string = "en") {
  console.log(`Setting data for: ${name}`, await data);
  const sectionContent = (await data)[lang];
  $("#" + name).html(sectionContent);
}

// export the functions with jquery
export { createSection, getDataJSON, setDataDiv };
