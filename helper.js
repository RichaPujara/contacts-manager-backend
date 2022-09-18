const ContactModel = require("./models/contactModel.js");

/**
 * Parses a vcard string into contactModel
 * @param {String} vcard
 * @returns {ContactModel} contact model representing provided vcard string
 */
function vcardParser(vcard) {
  // validate argument
  if (typeof vcard !== "string") {
    throw new TypeError("Argument must be of type string");
  }

  // replace any CR or CRLF with just LF, then split lines on LF
  const vcardLines = vcard.replace(/\r?\n|\r/g, "\n").split("\n");
  var contact = {};

  vcardLines.forEach((line) => {
    const value = line.substring(line.lastIndexOf(":") + 1);
    if (line.startsWith("N:")) {
      const name = value.split(";");
      contact.name_prefix = name[3];
      contact.first_name = name[1];
      contact.middle_name = name[2];
      contact.last_name = name[0];
      contact.name_suffix = name[4];
    }

    if (line.startsWith("FN:")) {
      contact.full_name = value;
    }

    if (line.startsWith("NICKNAME:")) {
      contact.nickname = value;
    }

    if (line.startsWith("ORG:")) {
      contact.organisation = value;
    }

    if (line.startsWith("TITLE:")) {
      contact.title = value;
    }

    if (line.startsWith("ROLE")) {
      contact.role = line.substring(line.search(":") + 1);
    }

    if (line.startsWith("GENDER:")) {
      contact.gender = value;
    }

    if (line.startsWith("PHOTO")) {
      contact.photo = line.substring(line.search(":") + 1);
    }

    if (line.startsWith("EMAIL")) {
      if (line.toLocaleUpperCase().includes("WORK")) {
        contact.work_email = value;
      } else if (line.toLocaleUpperCase().includes("OTHER")) {
        contact.other_email = value;
      } else {
        contact.email = value;
      }
    }

    if (line.startsWith("TEL")) {
      if (line.toLocaleUpperCase().includes("HOME")) {
        contact.home_phone_number = value;
      } else if (line.toLocaleUpperCase().includes("WORK")) {
        contact.work_phone_number = value;
      } else if (line.toLocaleUpperCase().includes("PAGER")) {
        contact.pager_number = value;
      } else if (
        line.toLocaleUpperCase().includes("FAX,HOME") ||
        line.toLocaleUpperCase().includes("HOME,FAX")
      ) {
        contact.home_fax_number = value;
      } else if (
        line.toLocaleUpperCase().includes("FAX,WORK") ||
        line.toLocaleUpperCase().includes("WORK,FAX")
      ) {
        contact.work_fax_number = value;
      } else if (line.toLocaleUpperCase().includes("OTHER")) {
        contact.other_phone_number = value;
      } else {
        contact.mobile_number = value;
      }
    }

    if (line.startsWith("UID")) {
      contact.role = value;
    }

    if (line.includes("ADR;")) {
      const address = value.replaceAll(";", ", ").substring(4);
      if (line.toLocaleUpperCase().includes("WORK")) {
        contact.work_address = address;
      } else if (line.toLocaleUpperCase().includes("OTHER")) {
        contact.other_address = address;
      } else {
        contact.home_address = address;
      }
    }
  });
  
  console.log("contact: ", contact);
  return contact;
}

function multiVcardParser(vcards) {
  // validate argument
  if (typeof vcards !== "string") {
    throw new TypeError("Argument must be of type string");
  }

  const contacts = [];
  vcards.split("BEGIN:VCARD").forEach((vcard) => {
    if (vcard) {
      const contact = vcardParser(vcard);
      if (JSON.stringify(contact) != "{}") {
        contacts.push(contact);
      }
    }
  });
  return contacts;
}

module.exports = multiVcardParser;
