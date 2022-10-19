const EPX_DATA = "https://zany-skitter-caper.glitch.me/experiences";
const SKILL_DATA = "https://zany-skitter-caper.glitch.me/skills";

async function getExpData(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getExpFromUrl(url, fun) {
  const data = await getExpData(url);
  fun(data);
  console.log(data);
}

// async function getSkillFromUrl(url) {
//   const data = await getExpData(url);
//   drawSkillTable(data);
//   console.log(data);
// }

function drawExpTable(data) {
  const jobsContainer = document.getElementById("jobs");

  data.forEach((dataItem) => {
    const dataContainer = document.createElement("div");
    dataContainer.className = "data-container";

    const fillYears = document.createElement("div");
    fillYears.className = "fill-years";
    const years = document.createElement("h3");
    years.textContent = dataItem.startYear + " - " + dataItem.finishYear;
    years.className = "years";

    const company = document.createElement("p");
    company.textContent = dataItem.companyName;
    company.style = "color: grey; font-weight: 500;";

    const fillDescription = document.createElement("div");
    fillDescription.className = "fill-description";

    const position = document.createElement("h3");
    position.textContent = dataItem.position;

    const description = document.createElement("p");
    description.textContent = dataItem.description;
    description.className = "description";

    fillYears.append(years, company);
    fillDescription.append(position, description);

    dataContainer.append(fillYears, fillDescription);
    jobsContainer.append(dataContainer);
  });
}

function drawSkillTable(data) {
  const skillsUpper = document.getElementById("skills");
  data.forEach((dataItem) => {
    const skillsContainer = document.createElement("div");
    skillsContainer.className = "all-skills";

    const skillsTitleDiv = document.createElement("div");
    skillsTitleDiv.className = "wrapper";
    const skillsTitle = document.createElement("div");

    const skillsPercent = document.createElement("div");
    skillsPercent.textContent = dataItem.level + "%";
    skillsPercent.style = "color: grey;";

    skillsTitle.textContent = dataItem.title;
    skillsTitle.style = "font-weight: bold;";

    skillsTitleDiv.append(skillsTitle, skillsPercent);

    const skillsLevel = document.createElement("div");
    const skillBarOuter = document.createElement("div");
    skillBarOuter.className = "skills-bar-outer";

    const skillBarInner = document.createElement("div");
    skillBarInner.className = "skills-bar-inner";
    skillBarInner.style.width = dataItem.level + "%";

    /*bar section*/
    skillBarOuter.append(skillBarInner);
    skillsLevel.append(skillBarOuter);

    skillsContainer.append(skillsTitleDiv, skillsLevel);
    skillsUpper.append(skillsContainer);
  });
}

getExpFromUrl(EPX_DATA, drawExpTable);
getExpFromUrl(SKILL_DATA, drawSkillTable);
// getSkillFromUrl(SKILL_DATA);
