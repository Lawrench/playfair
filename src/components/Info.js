import React from "react";
import {Component} from "react";

export class Info extends Component {
  render() {
    return (
      <article id="info" className="float-left info-area">
        The Playfair cipher or Playfair square or Wheatstone-Playfair cipher is a manual symmetric encryption technique and was the first literal digram substitution cipher. The scheme was invented in 1854 by Charles Wheatstone, but bears the name of Lord Playfair for promoting its use.
        <br/><br/>
        The technique encrypts pairs of letters (bigrams or digrams), instead of single letters as in the simple substitution cipher and rather more complex Vigenère cipher systems then in use. The Playfair is thus significantly harder to break since the frequency analysis used for simple substitution ciphers does not work with it. The frequency analysis of bigrams is possible, but considerably more difficult. With 600 possible bigrams rather than the 26 possible monograms (single symbols, usually letters in this context), a considerably larger cipher text is required in order to be useful.
        <br/><br/>
        It was initially rejected by the British Foreign Office when it was developed because of its perceived complexity. Wheatstone offered to demonstrate that three out of four boys in a nearby school could learn to use it in 15 minutes, but the Under Secretary of the Foreign Office responded, "That is very possible, but you could never teach it to attachés."
        <br/><br/>
        It was however later used for tactical purposes by British forces in the Second Boer War and in World War I and for the same purpose by the British and Australians during World War II because it is reasonably fast to use and requires no special equipment - just a pencil and some paper.
      </article>
    );
  }
}