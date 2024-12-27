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

    jsonSection.push(jsonData);
    setDataDiv(jsonSection[i], sections[i]);
    console.log(`Data set for: ${sections[i]}`);
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
    $("#" + name).html("<details id='" + name + "Details'><summary>" + name + "</summary>" + data + "</details>");
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

function reccGetValues(data: any, name: string) {
  var count = 0;
  for (var k in data) if (data.hasOwnProperty(k)) ++count;
  console.log("Count: " + count);
  var keys = [];
  keys = Object.keys(data);
  console.log("Keys: " + keys);
  if (count <= 0 || keys[0] == 0) {
    return;
  }
  for (var i = 0; i < count; i++) {
    var countTemp = 0;
    for (var j in data[keys[i]]) if (data.hasOwnProperty(j)) ++countTemp;
    if (countTemp == 0 && typeof data[keys[i]] != "object") {
      $("#" + name + "Details").append(data[keys[i]] + "<br>");
    }
    reccGetValues(data[keys[i]], name);
    /* $("#" + name).append(data[keys[i]]);
    reccGetValues(data[keys[i]], name);
    console.log("Data appended: " + data[keys[i]]); */
  }

  /* for (var i = 0; i < count; i++) {
    console.log("Key: " + Object.keys(data)[i]);
    console.log("Value: " + data[Object.keys(data)[i]]);
    $("#" + name).append(data[Object.keys(data)[i]]);
    reccGetValues(data[Object.keys(data)[i]], name);
    console.log("Data appended: " + data[Object.keys(data)[i]]);
  } */
}

// Function to add the content of the JSON into a div
async function setDataDiv(data: any, name: string, content: string = "", lang: string = "en") {
  console.log(`Setting data for: ${name}`, await data);
  console.log("./src/sections/" + name + ".html");
  console.log("Data: " + data);
  const sectionContent = await data;

  console.log("Data loaded: " + name, sectionContent);
  reccGetValues(sectionContent, name);
  /*   for (var key in sectionContent) {
    console.log("Key: " + key);
    console.log("Value: " + sectionContent[key]);
    $("#" + name).append(sectionContent[key]);
  } */

  //$("#" + name).html(sectionContent["Contact"]);
}

// export the functions with jquery
export { createSection, getDataJSON, setDataDiv };
