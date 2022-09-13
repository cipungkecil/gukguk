'use babel';

import GukgukView from './gukguk-view';
import { CompositeDisposable } from 'atom';

export default {

  gukgukView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gukgukView = new GukgukView(state.gukgukViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gukgukView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gukguk:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gukgukView.destroy();
  },

  serialize() {
    return {
      gukgukViewState: this.gukgukView.serialize()
    };
  },

  toggle() {
    console.log('Gukguk was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
