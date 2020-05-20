function match (string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;

    for (let c of string) {
        if (c == 'a') {
            foundA = true;
        } else if (foundA && c == "b") {
            return foundB = true;
        } else if (foundB && c == "c") {
            return foundC = true;
        } else if (foundC && c == "d") {
            return foundD = true;
        } else if (foundD && c == "e") {
            return foundE = true;
        } else if (foundE && c == "f") {
            return true;
        } else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;          
            foundE = false;
        }
    }
}


console.log(match('I abm groot'));