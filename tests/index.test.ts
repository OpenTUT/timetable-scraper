import { getTimetable } from "../src/index";
import { readFileSync } from "fs";
import path from "path";

describe("getSubject", () => {
	test("getTimetable returns correct object", () => {
		const html = readFileSync(
			path.join(__dirname, "./test0.html"),
			"utf-8",
		);
		document.body.innerHTML = html;

		const timetable = getTimetable();
		expect(timetable).toEqual(expect.objectContaining({
			year: expect.any(String),
			belong: expect.any(String),
			semester: expect.any(String),
			firstHalf: expect.any(Array),
			secondHalf: expect.any(Array),
			intensive: expect.any(Array),
		}));
	});
});
