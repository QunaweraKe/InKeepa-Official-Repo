export default function CommaFunct  (num) {
    if (num)
       return num.toLocaleString();
    return '';
    };

//not used
const firstletterCapitalizeFunc = (word) => {
    if (word)
       return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
    };
  