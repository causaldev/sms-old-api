import { DisplayRule } from 'app/modules/academic/marklist/subject/subject';
import NurserySkill from 'app/modules/academic/student/nurserySkill/nurserySkill';
import fs from 'fs';
import Application from '@ioc:Adonis/Core/Application';
import { formatMark, formatNursery } from './report-utils';

const plogo1 = `data:image/png;base64,${fs.readFileSync(
  Application.publicPath('/imgs/plogo1.png'),
  'base64'
)}`;
const plogo2 = `data:image/png;base64,${fs.readFileSync(
  Application.publicPath('/imgs/plogo2.png'),
  'base64'
)}`;
const plogo3 = `data:image/png;base64,${fs.readFileSync(
  Application.publicPath('/imgs/plogo3.png'),
  'base64'
)}`;
const plogo4 = `data:image/png;base64,${fs.readFileSync(
  Application.publicPath('/imgs/plogo4.png'),
  'base64'
)}`;
const plogo5 = `data:image/png;base64,${fs.readFileSync(
  Application.publicPath('/imgs/plogo5.png'),
  'base64'
)}`;

export default ({
  studentData,
  skills,
  subjects,
  marklist,
  promotionMap,
}: {
  studentData: any;
  skills: Record<keyof NurserySkill, any>;
  marklist: any;
  subjects: {
    subject: string;
    display_mode: string;
    display_rules: DisplayRule;
  }[];
  promotionMap: any;
}) => {
  const generateReportTable = () => {
    return subjects
      .map(
        ({ subject, display_mode, display_rules }) => `
      <tr>
        <td>${subject}</td>
        <td>${
          formatMark(
            marklist?.subjects[subject]?.q1,
            display_mode,
            display_rules
          ) || ''
        }</td>
        <td>${
          formatMark(
            marklist?.subjects[subject]?.q2,
            display_mode,
            display_rules
          ) || ''
        }</td>
        <td>${
          formatMark(
            marklist?.subjects[subject]?.q3,
            display_mode,
            display_rules
          ) || ''
        }</td>
        <td>${
          formatMark(
            marklist?.subjects[subject]?.q4,
            display_mode,
            display_rules
          ) || ''
        }</td>
      </tr>
  `
      )
      .join('\n');
  };

  const metaData = `
  <tr>
    <td>Conduct</td>
    <td>${marklist.Conduct.q1 || '-'}</td>
    <td>${marklist.Conduct.q2 || '-'}</td>
    <td>${marklist.Conduct.q3 || '-'}</td>
    <td>${marklist.Conduct.q4 || '-'}</td>
  </tr>
  <tr>
    <td>Absence</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Average</td>
    <td>${formatNursery(marklist.Average.q1) || '-'}</td>
    <td>${formatNursery(marklist.Average.q2) || '-'}</td>
    <td>${formatNursery(marklist.Average.q3) || '-'}</td>
    <td>${formatNursery(marklist.Average.q4) || '-'}</td>
  </tr>
  `;

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Report card</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      rel="stylesheet"
    />

    <style>
      /* Box sizing rules */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      /* Remove default margin */
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      figure,
      blockquote,
      dl,
      dd {
        margin: 0;
      }

      /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
      ul[role='list'],
      ol[role='list'] {
        list-style: none;
      }

      /* Set core root defaults */
      html:focus-within {
        scroll-behavior: smooth;
      }

      /* Set core body defaults */
      body {
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
      }

      /* A elements that don't have a class get default styles */
      a:not([class]) {
        text-decoration-skip-ink: auto;
      }

      /* Make images easier to work with */
      img,
      picture {
        max-width: 100%;
        display: block;
      }

      /* Inherit fonts for inputs and buttons */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      body {
        font-family: 'Roboto', sans-serif;
      }

      /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
      @media (prefers-reduced-motion: reduce) {
        html:focus-within {
          scroll-behavior: auto;
        }

        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      .table,
      thead {
        border: 1px solid black !important;
      }
      thead {
        background-color: black;
        color: white;
      }
      thead:not(:last-child) > tr > th {
        border-right: 1px solid white;
      }
      .table td {
        font-size: 1.2em;
        padding: 0;
        border-right: 1px solid black;
        border-top: 1px solid black;
      }
      .table td:not(:first-child) {
        text-align: center;
      }
      .table th {
        border-right: 1px solid black;
        padding: 10px;
        font-size: 1.2em;
      }
      .table-skill td {
        padding: 3px 0px;
        font-size: 1.1em;
      }
      .table-mark td {
        padding: 6px 0px;
        font-size: 1.3em;
      }
      .table td:last-child {
        border-right: 0;
      }
    </style>

    <style>
      body,
      html {
        height: 100%;
        width: 100%;
      }
      .container {
        display: flex;
        flex-direction: row;
        height: 100%;
      }

      /* Back left styles  */
      .back-left {
        flex-grow: 1;
        flex-basis: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }
      .signature {
        margin-bottom: 0px;
        display: flex;
        width: 100%;
        flex-direction: row;
        padding-bottom: 10px;
        padding: 0;
        padding-left: 30px;
      }

      .back-right {
        flex-grow: 1;
        flex-basis: 0;
      }
      .under {
        text-decoration: underline;
      }
      .bol {
        font-weight: bold;
      }
    </style>

    <style>
      @media print {
        .pagebreak {
          clear: both;
          page-break-after: always;
        } /* page-break-after works, as well */
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="back-left" style="padding-right: 60px; padding-left: 20px">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            margin-bottom: 20px;
          "
        >
          <h4 style="font-size: 24px; margin-bottom: 20px">
            Basic Skill and Personal Development
          </h4>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: center;
              margin-bottom: 20px;
            "
          >
            <img src="${plogo3}" />

            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 20px;
              "
            >
              <p>E &nbsp;&nbsp;&nbsp;&nbsp;Excellent</p>
              <p>G &nbsp;&nbsp;Good</p>
              <p>N &nbsp;&nbsp;Needs Improvement</p>
              <p>P &nbsp;&nbsp;Poor</p>
              <p>R &nbsp;&nbsp;At Risk</p>
            </div>
          </div>
        </div>

        <table class="table table-skill">
          <thead>
            <tr>
              <th scope="col eval"></th>
              <th scope="col">1st Quarter</th>
              <th scope="col">2nd Quarter</th>
              <th scope="col">3rd Quarter</th>
              <th scope="col">4th Quarter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Acknowledges Friends and Teachers</td>
              <td>${skills?.acknowledges?.q1 || ''}</td>
              <td>${skills?.acknowledges?.q2 || ''}</td>
              <td>${skills?.acknowledges?.q3 || ''}</td>
              <td>${skills?.acknowledges?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Greets Friends and Teachers</td>
              <td>${skills?.greets?.q1 || ''}</td>
              <td>${skills?.greets?.q2 || ''}</td>
              <td>${skills?.greets?.q3 || ''}</td>
              <td>${skills?.greets?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Works and Plays with other Children</td>
              <td>${skills?.works_with_others?.q1 || ''}</td>
              <td>${skills?.works_with_others?.q2 || ''}</td>
              <td>${skills?.works_with_others?.q3 || ''}</td>
              <td>${skills?.works_with_others?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Responds, Gives suggestion and Comments</td>
              <td>${skills?.responds?.q1 || ''}</td>
              <td>${skills?.responds?.q2 || ''}</td>
              <td>${skills?.responds?.q3 || ''}</td>
              <td>${skills?.responds?.q4 || ''}</td>
            </tr>
            <tr>
              <td>
                Accepts responsibility to actions<br />(Accepts corrections to
                mistakes)
              </td>
              <td>${skills?.accepts_responsibility?.q1 || ''}</td>
              <td>${skills?.accepts_responsibility?.q2 || ''}</td>
              <td>${skills?.accepts_responsibility?.q3 || ''}</td>
              <td>${skills?.accepts_responsibility?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Obeys quickly and cheerfully</td>
              <td>${skills?.obeys_quickly?.q1 || ''}</td>
              <td>${skills?.obeys_quickly?.q2 || ''}</td>
              <td>${skills?.obeys_quickly?.q3 || ''}</td>
              <td>${skills?.obeys_quickly?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Completes work carefully and neatly</td>
              <td>${skills?.completes_work?.q1 || ''}</td>
              <td>${skills?.completes_work?.q2 || ''}</td>
              <td>${skills?.completes_work?.q3 || ''}</td>
              <td>${skills?.completes_work?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Listens and follows direction</td>
              <td>${skills?.listens_and_follows?.q1 || ''}</td>
              <td>${skills?.listens_and_follows?.q2 || ''}</td>
              <td>${skills?.listens_and_follows?.q3 || ''}</td>
              <td>${skills?.listens_and_follows?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Works independently</td>
              <td>${skills?.work_independently?.q1 || ''}</td>
              <td>${skills?.work_independently?.q2 || ''}</td>
              <td>${skills?.work_independently?.q3 || ''}</td>
              <td>${skills?.work_independently?.q4 || ''}</td>
            </tr>
            <tr>
              <td>Vocabulary improvement</td>
              <td>${skills?.vocabulary_improvement?.q1 || ''}</td>
              <td>${skills?.vocabulary_improvement?.q2 || ''}</td>
              <td>${skills?.vocabulary_improvement?.q3 || ''}</td>
              <td>${skills?.vocabulary_improvement?.q4 || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="width: 50px"></div>

      <div class="back-left">
        <div
          style="display: flex; justify-content: center; margin-bottom: 20px"
        >
          <img height="400px" src="${plogo1}" />
        </div>

        <div style="text-align: center; margin-bottom: 20px">
          <h2 style="font-size: 36px">PRE-SCHOOL REPORT CARD</h2>
          <h2 style="font-size: 36px">ACADEMIC YEAR OF ${
            studentData.year
          } E.C.</h2>
        </div>
        <div
          class="mt-2"
          style="
            padding-left: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          "
        >
          <p style="margin-bottom: 16px">
            <span style="font-weight: bold;font-size: 28px">NAME </span
            ><span class="under bol" style="font-size: 28px"> ${
              studentData.name
            }</span>
          </p>
          <div style="margin-bottom: 16px">
            <span style="display: inline-block; margin-right: 60px">
              <span class="bol" style="font-size: 28px">AGE</span><span style="font-size: 28px" class="under bol"> ${
                studentData.age
              }</span>
            </span>
            <span style="display: inline-block">
              <span class="bol" style="font-size: 28px">SEX</span><span style="font-size: 28px" class="under bol"> ${
                studentData.sex
              }</span>
            </span>
          </div>
          <div style="margin-bottom: 16px">
            <span style="display: inline-block; margin-right: 20px">
              <span class="bol" style="font-size: 28px">GRADE</span><span style="font-size: 28px" class="under bol"> ${
                studentData.grade
              }</span>
            </span>
            <span style="display: inline-block">
              <span class="bol" style="font-size: 28px">____________to</span
              ><span class="bol under" style="font-size: 28px;margin: 0px 10px;"> ${
                promotionMap[studentData.grade] || '_____________'
              }</span>
            </span>
          </div>
          <div>
            <p style="text-align: center; margin-bottom: 40px" class="bol">
              The purpose of this report card is to provide parents of
              kindergarten students with the information regarding their child’s
              progress in learning both educational and social skills.
            </p>
            <div
              style="
                width: 100%;
                align-items: center;
                justify-content: center;
                text-align: center;
                margin-top: 10px;
                display: flex;
              "
            >
              <img src="${plogo2}" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagebreak"></div>

    <div class="container">
      <div class="back-left" style="padding-right: 50px; padding-left: 20px;justify-content: flex-start;padding-top: 20px">
        <div
          style="
            display: flex;
            justify-content: center;
            text-align: center;
            margin-bottom: 20px;
            width: 100%;
          "
        >
          <img src="${plogo5}" />
        </div>

        <table class="table table-mark">
          <thead>
            <tr>
              <th class="theading" scope="col">Subject</th>
              <th class="theading" scope="col">
                1<span class="sup">st</span>
                Quarter
              </th>
              <th class="theading" scope="col">
                2<span class="sup">nd</span>
                Quarter
              </th>
              <th class="theading" scope="col">
                3<span class="sup">rd</span>
                Quarter
              </th>
              <th class="theading" scope="col">
                4<span class="sup">th</span>
                Quarter
              </th>
            </tr>
          </thead>
          <tbody>
            ${generateReportTable()}
            ${metaData}
          </tbody>
        </table>
      </div>

      <div style="width: 50px"></div>

      <div class="back-left" style="justify-content: flex-start; padding-top: 20px;">
        <div
          style="
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            padding-left: 10px;
          "
        >
          <h5
            class="under"
            style="
              margin-bottom: 15px;
              text-align: center;
              width: 100%;
              text-decoration: underline;
              font-size: 26px;
            "
          >
            Achievement with respect to every subject is evaluated as follows
          </h5>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-evenly;
              align-items: center;
              width: 100%;
            "
          >
            <div>
              <p style="margin-bottom: 15px;">A = 90% - 100%</p>
              <p style="margin-bottom: 15px;">B = 80% - 89%</p>
              <p style="margin-bottom: 15px;">C = 70% - 79%</p>
              <p style="margin-bottom: 15px;">N &le; 70% Needs Improvement</p>
            </div>
            <div>
              <img src="${plogo4}" />
            </div>
          </div>
          <div>
            <h5 style="font-size: 20px; margin: 0; margin-top: 15px">
              First Quarter
            </h5>
            <p class="m-0">
              Teacher's
              Comment_____________________________________________________________________<br />________________________________________________________________________________
            </p>
            <p class="m-0">
              Teacher's Signature______________ &nbsp;&nbsp;&nbsp; Director's
              Signature____________
            </p>
            <p class="m-0">Parents Signature______________</p>
          </div>
          <div>
            <h5 style="font-size: 20px; margin: 0; margin-top: 15px">
              Second Quarter
            </h5>
            <p class="m-0">
              Teacher's
              Comment_____________________________________________________________________<br />________________________________________________________________________________
            </p>
            <p class="m-0">
              Teacher's Signature______________ &nbsp;&nbsp;&nbsp; Director's
              Signature____________
            </p>
            <p class="m-0">Parents Signature______________</p>
          </div>
          <div>
            <h5 style="font-size: 20px; margin: 0; margin-top: 15px">
              Third Quarter
            </h5>
            <p class="m-0">
              Teacher's
              Comment_____________________________________________________________________<br />________________________________________________________________________________
            </p>
            <p class="m-0">
              Teacher's Signature______________ &nbsp;&nbsp;&nbsp; Director's
              Signature____________
            </p>
            <p class="m-0">Parents Signature______________</p>
          </div>
          <div>
            <h5 style="font-size: 20px; margin: 0; margin-top: 15px">
              Fourth Quarter
            </h5>
            <p class="m-0">
              Teacher's
              Comment_____________________________________________________________________<br />________________________________________________________________________________
            </p>
            <p class="m-0">
              Teacher's Signature______________ &nbsp;&nbsp;&nbsp; Director's
              Signature____________
            </p>
            <p class="m-0">Parents Signature______________</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

  `;
};
