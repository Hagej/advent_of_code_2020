"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var file, values, passportData, result, i;
        return __generator(this, function (_a) {
            file = fs_1.readFileSync("input.txt", "utf-8");
            values = file.split("\n");
            passportData = [];
            result = 0;
            for (i = 0; i < values.length; i++) {
                if (values[i] === "") {
                    result += isValidPassport(passportData) ? 1 : 0;
                    passportData = [];
                }
                else {
                    passportData.push.apply(passportData, values[i].split(" "));
                    if (i === values.length - 1)
                        result += isValidPassport(passportData) ? 1 : 0;
                }
            }
            console.log("Result:", result);
            return [2 /*return*/];
        });
    });
}
function isValidPassport(passportData) {
    var includedKeys = 0;
    for (var _i = 0, passportData_1 = passportData; _i < passportData_1.length; _i++) {
        var s = passportData_1[_i];
        var _a = s.split(":"), key = _a[0], val = _a[1];
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
function validateByr(val) {
    return parseInt(val) <= 2002 && parseInt(val) >= 1920;
}
function validateiyr(val) {
    return parseInt(val) <= 2020 && parseInt(val) >= 2010;
}
function validateeyr(val) {
    return parseInt(val) <= 2030 && parseInt(val) >= 2020;
}
function validatehgt(val) {
    var a = val.slice(-2);
    var amount = parseInt(val);
    if (a === "cm")
        return amount <= 193 && amount >= 150;
    if (a === "in")
        return amount <= 76 && amount >= 59;
    return false;
}
function validatehcl(val) {
    return /^#([a-f0-9]){6}$/.test(val);
}
var validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
function validateecl(val) {
    return validEcl.includes(val);
}
function validatepid(val) {
    return /^\d{9}$/.test(val);
}
main();
