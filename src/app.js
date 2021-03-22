// import './main.css';
// import styles from './styles/style.css';
// import config_json from './input.json'
// import {FIELD_IDS as fields} from './config-fields.js'

// const h1 = document.querySelector('h1');
// h1.classList.add(styles.h1);

// // async function print() {
// //   // Here we are using dynamic import
// //   const { greet } = await import('./greet');
// //   const response = await greet('John Doe');
// //   console.log(response);
// // }

// // print();

// showWelcomePage();
// openQuestions();

// function showWelcomePage()
// {
//   for(let i = 0; i < config_json.sections.length; i++){
//     if((config_json[fields.SECTIONS][i][fields.SECTION_TYPE]).toLowerCase() === "welcome")
//     {
//       display_welcome_msg();
//     }
//     }
// }

// function display_welcome_msg()
// {

//   console.log("fields:"+JSON.stringify(fields));
//   console.log("field::::"+fields.SECTIONS)
    
//     var out1 = "";
//     var out2 = "";
//     var out3 = "";


//         out1 += config_json.sections[0].sectionType.toLowerCase + ' '+ 'to the portal '+ '<br>';
//         out2 += config_json.sections[0].welcomeText +'<br>';
//         out3 += config_json.sections[0].startText + ' '+ 'Survey';

//     document.getElementById("welcomemsg").innerHTML = out1;
//     document.getElementById("welcometext").innerHTML = out2;
//     document.getElementById("buttontext").innerHTML = out3;


// console.log("hi.."+config_json[fields.SECTIONS][0][fields.SECTION_TYPE]);

// }


// function openQuestions()
// {
//   var question1 = "Do you like this product?";

//   document.getElementById("question1").innerHTML = question1;
// }


