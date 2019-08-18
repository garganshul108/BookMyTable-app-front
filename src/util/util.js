export function captialize(s) {
    if (typeof s !== 'string') return '';
    var strings = s.split(' ');
    // console.log(strings);
    var newString = '';
    for (s of strings) {
        if (s.length > 2)
            newString += (s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()) + " ";
        else
            newString += (s.toLowerCase()) + " ";
    }

    return newString.trim();
}

// console.log(captialize('Anshul is gr8') + ':');