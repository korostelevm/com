<script setup>
import { ref, computed } from "vue";
import { marked } from "marked";
import prism from "prismjs";

// Add numbering to the Code blocks
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "prismjs/plugins/toolbar/prism-toolbar.js"; // required for the following plugins
import "prismjs/plugins/toolbar/prism-toolbar.css"; // required for the following plugins
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js"; // show copy button
import "prismjs/plugins/show-language/prism-show-language.js"; // display the language of the code block

// This is needed for a conflict with other CSS files being used (i.e. Bulma).
import "prismjs/plugins/custom-class/prism-custom-class";
prism.plugins.customClass.map({ number: "prism-number", tag: "prism-tag" });

// sample markdown file
const mdfile = "/sample.md";
const markDown = ref("");

//marked Options => https://marked.js.org/using_advanced#options
marked.use({
  highlight: (code, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  },
});

// read in the md file and apply the highlight style to the Code Block
const getMarkdownData = async () => {
    console.log('asdf')

    // let f = require('!raw-loader!./aws-s3-why-sometimes-you-should-press-the-100k-dollar-button.md').default
  markDown.value = "asdfasdf"
//   await fetch(mdfile)
//     .then((response) => response.text())
//     .then((data) => ( = data));
  prism.highlightAll(); // perform the highlighting of the Code Blocks
};

// use the finialized markdown to HTML code in the template
const mdToHtml = computed(() => {
  const mdhtml = marked.parse(markDown.value);
  return mdhtml;
});

// call the function to be ran
// getMarkdownData();
</script>

<template>
  <div class="content">
    asdfsdf
    <!-- Normal Code Blocks -->
    <!-- <div v-html="mdToHtml"></div> -->
    <!-- Add numbering to the Code Blocks -->
    <div class="line-numbers language-markup" v-html="mdToHtml"></div>
  </div>
</template>

<style >
/* Add the prism themes here */
/* @import "prismjs/themes/prism-coy.css"; */

</style>
