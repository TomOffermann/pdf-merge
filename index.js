#!/usr/bin/env node

const PDFMerger = require("pdf-merger-js");
const colors = require("colors");
const program = require("commander");
const readline = require("readline");

const merger = new PDFMerger();
const FILE_SUFFIX = ".pdf";

program
  .name("pdf-merge")
  .description(
    colors.magenta("Merge multiple pdf-documents with the following command:") +
      "\n\n" +
      colors.cyan("==>") +
      "\t" +
      colors.bgMagenta(" pdf-merge ") +
      colors.blue(" ./pdf1.pdf") +
      colors.blue(" ./test.pdf ...") +
      "\n\t" +
      colors.cyan("-------------------------------------")
  )
  .argument("<path...>")
  .option("-d, --docs <items>", "Specify the amount of documents to merge")
  .action(function (args, options) {
    if (options.docs && args.length !== parseInt(options.docs)) {
      console.log(
        colors.red("Document count") +
          colors.cyan(` (${options.docs}) `) +
          colors.red("and given paths") +
          colors.cyan(` (${args.length}) `) +
          colors.red("don't match")
      );
      return;
    }
    console.log(colors.rainbow("PDF-Merge ") + colors.cyan("\nby Tom Offermann\n"));
    const readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question(
      colors.magenta("Enter file name ") + "(default: merged.pdf): ",
      (name) => {
        let fileName;
        if (name.substring(name.length - 4) === ".pdf") {
          fileName = name;
        } else {
          fileName = name + ".pdf";
        }
        console.log("\n");
        readLine.close();
        (async () => {
          args.forEach(path => {
            merger.add(path)
          });
        
          await merger.save(fileName);
        })();
        console.log(colors.green("Successfully merged files") + args.map(e => colors.yellow(" " + e)).join() + colors.green(" into file ") + colors.yellow(fileName))
      }
    );
  })
  .parse(process.argv);


