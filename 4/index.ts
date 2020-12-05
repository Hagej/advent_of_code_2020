import { readFileSync } from "fs";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

async function main() {
  const file = readFileSync("input.txt", "utf-8");
  const values = file.split("\n");

  let passportData: string[] = [];
  let result = 0;

  for (let i = 0; i < values.length; i++) {
    if (values[i] === "") {
      result += isValidPassport(passportData) ? 1 : 0;
      passportData = [];
    } else {
      passportData.push(...values[i].split(" "));
      if (i === values.length - 1)
        result += isValidPassport(passportData) ? 1 : 0;
    }
  }

  console.log("Result:", result);
}

function isValidPassport(passportData: string[]): boolean {
  let includedKeys = 0;
  for (let s of passportData) {
    const [key, val] = s.split(":");
    switch (key) {
      case "byr":
        includedKeys += validateByr(val) ? 1 : 0;
        break;
      case "iyr":
        includedKeys += validateiyr(val) ? 1 : 0;
        break;
      case "eyr":
        includedKeys += validateeyr(val) ? 1 : 0;
        break;
      case "hgt":
        includedKeys += validatehgt(val) ? 1 : 0;
        break;
      case "hcl":
        includedKeys += validatehcl(val) ? 1 : 0;
        break;
      case "ecl":
        includedKeys += validateecl(val) ? 1 : 0;
        break;
      case "pid":
        includedKeys += validatepid(val) ? 1 : 0;
        break;
      default:
        break;
    }
  }
  return includedKeys === requiredFields.length;
}

function validateByr(val: string) {
  return parseInt(val) <= 2002 && parseInt(val) >= 1920;
}

function validateiyr(val: string) {
  return parseInt(val) <= 2020 && parseInt(val) >= 2010;
}
function validateeyr(val: string) {
  return parseInt(val) <= 2030 && parseInt(val) >= 2020;
}
function validatehgt(val: string) {
  const a = val.slice(-2);
  const amount = parseInt(val);
  if (a === "cm") return amount <= 193 && amount >= 150;
  if (a === "in") return amount <= 76 && amount >= 59;
  return false;
}
function validatehcl(val: string) {
  return /^#([a-f0-9]){6}$/.test(val);
}
const validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
function validateecl(val: string) {
  return validEcl.includes(val);
}

function validatepid(val: string) {
  return /^\d{9}$/.test(val);
}

main();
