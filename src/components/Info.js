import React from "react";
import {Component} from "react";

export class Info extends Component {
  render() {
    return (
      <div id="info" className="float-left info-area">
        The Playfair cipher, also known as the Playfair square or Wheatstone-Playfair cipher, represents a manual symmetric encryption method. It was the first of its kind to implement literal digram substitution cipher. Although Charles Wheatstone invented the scheme in 1854, it is named after Lord Playfair, who championed its use.
        <br/><br/>
        Unlike the simple substitution cipher and the more intricate Vigenère cipher systems prevalent at the time, the Playfair cipher encrypts pairs of letters, known as bigrams or digrams. This makes the Playfair cipher considerably more challenging to decipher since the frequency analysis typically used for simple substitution ciphers is ineffective. (Frequency analysis of bigrams is feasible, it is more complex.) Given the 600 potential bigrams compared to the 26 possible monograms (single symbols, typically letters), a much larger cipher text is necessary for effective use.
        <br/><br/>
        Despite its innovative approach, the British Foreign Office initially dismissed the Playfair cipher due to its complexity. Wheatstone proposed a demonstration, asserting that three out of four boys from a local school could master the cipher in 15 minutes; however, the Under Secretary of the Foreign Office retorted, "That is very possible, but you could never teach it to attachés."
        <br/><br/>
        Despite initial rejection, the Playfair cipher found its use in tactical operations by British forces during the Second Boer War and World War I. The British and Australians also employed it during World War II. Its appeal lay in its relative speed and the fact that it required no specialized equipment—just a pencil and paper.
      </div>
    );
  }
}
