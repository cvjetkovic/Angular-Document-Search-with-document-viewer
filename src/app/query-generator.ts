export class QueryGenerator {
    // Funkcija koja pretvara dugacak whitespace ("    ") u jedan (" ")

    cleanStr(str: string) {

        while (str.indexOf("\t") > -1) {
            str = str.replace("\t", " ");
        }
        while (str.indexOf("  ") > -1) {
            str = str.replace("  ", " ");
        }

        return str;
    }


    // Funkcija koja brise whitespace na pocetku i na kraju

    trimStr(str: string) {
        let string: string;
        string = str.trim();

        return string;
    }


    // Funkcija koja dodaje :*| izmedju svake reci i na kraju :*

    ftsOR(str: string) {
        let string;
        string = str.replace(/ /g, ":*|") + ":*";

        return string;
    }


    // Funkcija koja dodaje :*& izmedju svake reci i na kraju :*

    ftsAND(str: string) {
        let string;
        string = str.replace(/ /g, ":*&") + ":*";

        return string;
    }


    // Funkcija koja proverava da li je unesen tekst na latinici ili na cirilici

    checkLatin(str: string) {

        let state = true;
        let stringForCheck: string;
        const cyrillicPattern = /^[\u0400-\u04FF]+$/;

        stringForCheck = this.cleanStr(this.trimStr(str.replace(/ /g, "")));
        state = cyrillicPattern.test(stringForCheck);

        return state;
    }


    // Funkcija koja konvertuje latinicu u cirilicu

    latToCyr(entered_text: string) {

        entered_text = entered_text.replace(/lj/g, 'љ');
        entered_text = entered_text.replace(/Lj/g, 'Љ');
        entered_text = entered_text.replace(/LJ/g, 'Љ');

        entered_text = entered_text.replace(/nj/g, 'њ');
        entered_text = entered_text.replace(/Nj/g, 'Њ');
        entered_text = entered_text.replace(/NJ/g, 'Њ');

        entered_text = entered_text.replace(/dž/g, 'џ');
        entered_text = entered_text.replace(/Dž/g, 'Џ');
        entered_text = entered_text.replace(/DŽ/g, 'Џ');

        entered_text = entered_text.replace(/a/g, 'а');
        entered_text = entered_text.replace(/b/g, 'б');
        entered_text = entered_text.replace(/c/g, 'ц');
        entered_text = entered_text.replace(/č/g, 'ч');
        entered_text = entered_text.replace(/ć/g, 'ћ');
        entered_text = entered_text.replace(/d/g, 'д');
        entered_text = entered_text.replace(/đ/g, 'ђ');
        entered_text = entered_text.replace(/e/g, 'е');
        entered_text = entered_text.replace(/f/g, 'ф');
        entered_text = entered_text.replace(/g/g, 'г');
        entered_text = entered_text.replace(/h/g, 'х');
        entered_text = entered_text.replace(/i/g, 'и');
        entered_text = entered_text.replace(/j/g, 'ј');
        entered_text = entered_text.replace(/k/g, 'к');
        entered_text = entered_text.replace(/l/g, 'л');
        entered_text = entered_text.replace(/m/g, 'м');
        entered_text = entered_text.replace(/n/g, 'н');
        entered_text = entered_text.replace(/o/g, 'о');
        entered_text = entered_text.replace(/p/g, 'п');
        entered_text = entered_text.replace(/r/g, 'р');
        entered_text = entered_text.replace(/s/g, 'с');
        entered_text = entered_text.replace(/š/g, 'ш');
        entered_text = entered_text.replace(/t/g, 'т');
        entered_text = entered_text.replace(/u/g, 'у');
        entered_text = entered_text.replace(/v/g, 'в');
        entered_text = entered_text.replace(/z/g, 'з');
        entered_text = entered_text.replace(/ž/g, 'ж');

        entered_text = entered_text.replace(/A/g, 'А');
        entered_text = entered_text.replace(/B/g, 'Б');
        entered_text = entered_text.replace(/C/g, 'Ц');
        entered_text = entered_text.replace(/Č/g, 'Ч');
        entered_text = entered_text.replace(/Ć/g, 'Ћ');
        entered_text = entered_text.replace(/D/g, 'Д');
        entered_text = entered_text.replace(/Đ/g, 'Ђ');
        entered_text = entered_text.replace(/E/g, 'Е');
        entered_text = entered_text.replace(/F/g, 'Ф');
        entered_text = entered_text.replace(/G/g, 'Г');
        entered_text = entered_text.replace(/H/g, 'Х');
        entered_text = entered_text.replace(/I/g, 'И');
        entered_text = entered_text.replace(/J/g, 'Ј');
        entered_text = entered_text.replace(/K/g, 'К');
        entered_text = entered_text.replace(/L/g, 'Л');
        entered_text = entered_text.replace(/M/g, 'М');
        entered_text = entered_text.replace(/N/g, 'Н');
        entered_text = entered_text.replace(/O/g, 'О');
        entered_text = entered_text.replace(/P/g, 'П');
        entered_text = entered_text.replace(/R/g, 'Р');
        entered_text = entered_text.replace(/S/g, 'С');
        entered_text = entered_text.replace(/Š/g, 'Ш');
        entered_text = entered_text.replace(/T/g, 'Т');
        entered_text = entered_text.replace(/U/g, 'У');
        entered_text = entered_text.replace(/V/g, 'В');
        entered_text = entered_text.replace(/Z/g, 'З');
        entered_text = entered_text.replace(/Ž/g, 'Ж');

        return entered_text;
    }


    // Funkcija koja generise query

    generateQuery(str: string, type: string) {


        let state = this.checkLatin(str);
        let query = this.cleanStr(this.trimStr(str));

        if (type === "or") {
            query = this.ftsOR(query);
        } else if (type === "and") {
            query = this.ftsAND(query);
        }

        if (state === false) {
            query = this.latToCyr(query);
        }

        return query;
    }
}


