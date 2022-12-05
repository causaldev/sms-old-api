export const headMainTemplate = `
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * {
    margin: 0;
    padding: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin-left: -10px;
  }
  .full {
    width: 100%;
    height: 100%;
  }
  .main-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    background-color: white;
    min-height: 900px;
  }

  /* Left box  */
  .left-box {
    display: flex;
    flex-direction: column;
    /* background-color: crimson; */
    justify-content: space-evenly;
    align-items: center;
    font-weight: bold;
    padding: 10px;
  }
  .under {
    text-decoration: underline;
  }
  /* Table  */
  .tables-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px;
    width: 100%;
    height: 100%;
    justify-content: space-between;
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
    font-size: 1em;
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
  }
  .bot-table td {
    padding: 15px;
  }
  .table td:last-child {
    border-right: 0;
  }
  .bot-table,
  .eval-table {
    width: 550px;
  }
  .full {
    align-items: center;
  }
  .eval-table td {
    font-size: 15px;
    height: 25px;
  }

  /* Right box */
  .holder {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    width: 100%;
    height: 100%;
    padding: 20px 20px 10px 0px;
    font-weight: bold;
    margin-left: -60px;
  }
  .foot {
    justify-content: center;
  }
  .footer p {
    margin: 0;
  }
  .main-title {
    letter-spacing: 15px;
    font-size: 280%;
  }
  .center-it {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .img-container {
    margin-top: -20px;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .spacer {
    display: inline-block;
    width: 30px;
    height: 10px;
    margin-right: 5px;
  }
  .ticker {
    display: inline-block;
    width: 30px;
    height: 10px;
    margin-right: 5px;
    border: 1px solid black;
  }
  .inliner > * {
    display: inline-block;
  }
  .inliner > p {
    margin: 0;
    font-size: 1.2em;
  }

  .evaluation > p {
    margin: 0;
    font-size: 1.2em;
  }
</style>

<style>
.back-main-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  background-color: white;
}

/* Table  */
.table-holder {
  /* padding: 20px 20px 0 20px; */
}

.table {
  border: 1px solid black;
}
.table td {
  font-size: 1.2em;
  padding: 0;
  border-right: 1px solid black;
  align-items: center;
}
.table th {
  border-right: 1px solid black;
  font-size: 0.8em;
}

.theading {
  text-align: center;
}
tbody tr td:not(:first-child) {
  text-align: center;
}
tbody tr td:first-child {
  padding-left: 5px;
}
td {
  font-weight: bold;
}
table tr td:last-child,
th:last-child {
  border-right: 0;
}

/* Left box  */
.back-left-box {
  display: flex;
  flex-direction: column;
  /* background-color: crimson; */
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding-bottom: 10px;
}
/* Signature  */
.back-signature {
  margin-bottom: 0px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
  padding: 0;
  padding-left: 30px;
}

/* Right box */
.back-right-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: aqua; */
  font-weight: bold;
  padding: 10px 30px;
  margin-right: -30px;
}
.back-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.back-spacer {
  display: inline-block;
  width: 30px;
  height: 10px;
  margin-right: 5px;
}
.back-ticker {
  display: inline-block;
  width: 30px;
  height: 10px;
  margin-right: 5px;
  border: 1px solid black;
}
.back-inliner > * {
  display: inline-block;
}
.back-inliner > p {
  margin: 0;
  font-size: 1.2em;
}

.back-evaluation > p {
  margin: 0;
  font-size: 1.2em;
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
`;
