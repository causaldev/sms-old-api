import fs from 'fs';
import Skill from 'app/modules/academic/student/skill/skill';
import Application from '@ioc:Adonis/Core/Application';

const logo = `data:image/png;base64,${fs.readFileSync(
  Application.publicPath('imgs/logo.png'),
  'base64'
)}`;

export const generateFrontTemplate = () => {
  const leftTemplate = (
    skills: Record<keyof Skill, Record<string, string>>
  ) => `
  <div class="left-box full">
  <div
    style="
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <h2>Basic Skill and Personal Development</h2>
    <div class="mt-2">
      <h3 class="under">Evaluation Code</h3>
      <br />
      <div style="margin-bottom: 8px">
        <span style="margin-right: 30px">E = Excellent</span>
        <span>P = Poor</span>
      </div>
      <div style="margin-bottom: 8px">
        <span style="margin-right: 58px">G = Good</span>
        <span>R = At Risk</span>
      </div>
      <div>
        <span class="m-n3 mr-5">N = Needs Improvement</span>
      </div>
    </div>
  </div>
  <div style="flex-grow: 1">
    <table class="table border eval-table">
      <thead>
        <tr>
          <th scope="col eval" style="width: 300px">Evaluation Areas</th>
          <th scope="col">First Quarter</th>
          <th scope="col">Second Quarter</th>
          <th scope="col">Third Quarter</th>
          <th scope="col">Fourth Quarter</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Punctuality</td>
          <td>${skills?.punctuality?.q1 || ''}</td>
          <td>${skills?.punctuality?.q2 || ''}</td>
          <td>${skills?.punctuality?.q3 || ''}</td>
          <td>${skills?.punctuality?.q4 || ''}</td>
        </tr>
        <tr>
          <td>National Anthem Participation</td>
          <td>${skills?.anthem_participation?.q1 || ''}</td>
          <td>${skills?.anthem_participation?.q2 || ''}</td>
          <td>${skills?.anthem_participation?.q3 || ''}</td>
          <td>${skills?.anthem_participation?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Attendance</td>
          <td>${skills?.attendance?.q1 || ''}</td>
          <td>${skills?.attendance?.q2 || ''}</td>
          <td>${skills?.attendance?.q3 || ''}</td>
          <td>${skills?.attendance?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Completing Work on Time</td>
          <td>${skills?.completing_work?.q1 || ''}</td>
          <td>${skills?.completing_work?.q2 || ''}</td>
          <td>${skills?.completing_work?.q3 || ''}</td>
          <td>${skills?.completing_work?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Follow Rules</td>
          <td>${skills?.follow_rules?.q1 || ''}</td>
          <td>${skills?.follow_rules?.q2 || ''}</td>
          <td>${skills?.follow_rules?.q3 || ''}</td>
          <td>${skills?.follow_rules?.q4 || ''}</td>
        </tr>
        <tr>
          <td>English Use and Practice</td>
          <td>${skills?.english_use?.q1 || ''}</td>
          <td>${skills?.english_use?.q2 || ''}</td>
          <td>${skills?.english_use?.q3 || ''}</td>
          <td>${skills?.english_use?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Listening Skill</td>
          <td>${skills?.listening?.q1 || ''}</td>
          <td>${skills?.listening?.q2 || ''}</td>
          <td>${skills?.listening?.q3 || ''}</td>
          <td>${skills?.listening?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Participation in class</td>
          <td>${skills?.class_participation?.q1 || ''}</td>
          <td>${skills?.class_participation?.q2 || ''}</td>
          <td>${skills?.class_participation?.q3 || ''}</td>
          <td>${skills?.class_participation?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Handwriting</td>
          <td>${skills?.handwriting?.q1 || ''}</td>
          <td>${skills?.handwriting?.q2 || ''}</td>
          <td>${skills?.handwriting?.q3 || ''}</td>
          <td>${skills?.handwriting?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Use of Communication Book</td>
          <td>${skills?.communication_book_use?.q1 || ''}</td>
          <td>${skills?.communication_book_use?.q2 || ''}</td>
          <td>${skills?.communication_book_use?.q3 || ''}</td>
          <td>${skills?.communication_book_use?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Material Handling</td>
          <td>${skills?.material_handling?.q1 || ''}</td>
          <td>${skills?.material_handling?.q2 || ''}</td>
          <td>${skills?.material_handling?.q3 || ''}</td>
          <td>${skills?.material_handling?.q4 || ''}</td>
        </tr>
        <tr>
          <td>Cooperation with others</td>
          <td>${skills?.cooperation?.q1 || ''}</td>
          <td>${skills?.cooperation?.q2 || ''}</td>
          <td>${skills?.cooperation?.q3 || ''}</td>
          <td>${skills?.cooperation?.q4 || ''}</td>
        </tr>
        <tr>
          <td>School Uniform</td>
          <td>${skills?.school_uniform?.q1 || ''}</td>
          <td>${skills?.school_uniform?.q2 || ''}</td>
          <td>${skills?.school_uniform?.q3 || ''}</td>
          <td>${skills?.school_uniform?.q4 || ''}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="flex-grow: 1">
    <table class="table border bot-table">
      <thead>
        <tr>
          <th scope="col">Quarter</th>
          <th scope="col">Parents comment</th>
          <th scope="col">Second Quarter</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1st</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>2nd</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>3rd</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `;

  const rightTemplate = (student, year, promotionMap) => `

  <div class="holder">
  <div class="center-it head">
    <h1 class="main-title">ስትራይቨርስ አካዳሚ</h1>
    <h2 class="main-title" style="font-weight: 900">Strivers Academy</h2>
  </div>
  <div class="center-it img-container">
    <!-- <img src="res/logo.png" /> -->
    <img
      width="250px"
      src="${logo}"
      alt="Logo"
    />
    <br />
    <p class="m-0">Tel: 011 8829390 / 0911685076</p>
    <p class="m-0">Web: www.striversacademy.com</p>
    <p style="font-size: 20px; font-weight: 200">Addis Ababa</p>
  </div>
  <div class="center-it name" style="font-size: 40px; font-weight: 100">
    <p style="text-align: center; text-decoration: underline">
      STUDENT REPORT CARD FOR THE
    </p>
    <p style="text-align: center; text-decoration: underline">
      ACADEMIC YEAR OF ${year} E.C.
    </p>
  </div>

  <div
    class="studet"
    style="
      width: 100%;
      align-items: flex-start;
      display: flex;
      padding-left: 25px;
      flex-direction: column;
      font-size: 200%;
    "
  >
    <p style="font-weight: bold">
      Name:
      <span class="under" style="display: inline-block">
        ${student.name}</span
      >
    </p>
    <div style="margin-top: 15px">
      <span
        style="
          font-weight: bold;
          display: inline-block;
          margin-right: 20px;
        "
      >
        Age : <span class="under"> ${student.age}</span>
      </span>
      <span style="display: inline-block; font-weight: bold">
        Sex : <span class="under"> ${student.sex}</span>
      </span>
    </div>
    <div style="margin-top: 30px">
      <span style="display: inline-block; font-weight: bold"
        ><span class="under"> ${student.grade}</span>
      </span>
      <span style="display: inline-block; font-weight: bold; font-size:0.85em;margin-right: 15px;">
      ____________to<span class="under"  style="display: inline-block; font-weight: bold;margin: 0px 10px;">${
        null || '___________'
      }</span>
      </span>
    </div>
  </div>

  <div class="center-it foot">
    <p>ጥረታችን በሞራል፣ በመንፈስ፣ በሥነ-ምግባርና በግብረ ገብ የታነጹ ጤናማ ትውልድን ማፍራት ነው፤</p>
    <p>We strive to prepare morally, physically, ethically healthy</p>
    <p>God fearing young generation!</p>
  </div>
</div>
  `;

  const frontReportTemplate = (studentData, skills, year, promotionMap) => `
    <div class="main-container full">
      ${leftTemplate(skills)}

      <div style="width: 320px"></div>

      ${rightTemplate(studentData, year, promotionMap)}
    </div>

    <div class="pagebreak"></div>
  `;

  return frontReportTemplate;
};

// promotionMap[student.grade];
