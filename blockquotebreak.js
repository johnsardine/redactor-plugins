if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
RedactorPlugins.blockquote_break   = {

  init: function() {
    this.opts.keydownCallback =  function(event) {
      if (event.which != 13) {
        return;
      }

      current_node = this.getBlock();
      blockquote_node = this.getMostTopBlockquote(current_node, this.get());
      if (!blockquote_node) {
        return;
      }
      event.preventDefault();

      close_tags = this.getClose(current_node, blockquote_node);
      open_tags = this.getOpen(current_node, blockquote_node);
      split_token = '_$'+ (new Date()).getTime() + '$';
      this.insertText(split_token);

      this.sync(); // Sync the change

      split_content = this.get().split(split_token);
      join_with = "</blockquote><br id=\"__\"><blockquote>";
      divided_content = split_content[0] + close_tags + join_with + open_tags + split_content[1];
      this.set(divided_content);

      el = this.$editor.find('#__');
      el.removeAttr('id');
      this.setCaret(el, 4);

      this.sync();
    }
  },

  getMostTopBlockquote: function(n, r) {
    var last_bq = null;
    while (n) {
      if (n == r)
        break;
      if (n.nodeName === 'BLOCKQUOTE')
        last_bq = n;
      n = n.parentNode;
    }
    return last_bq;
  },
  getClose: function(n, r) {
    // get the htnk "close-tag" of a node
    function getCloseTag(n) {
        close_tag = "</" + n.nodeName.toLowerCase() + ">";
        return close_tag;
    }

      var result = '';
      while (n) {
        if (n == r)
          break;
        result += getCloseTag(n);
        n = n.parentNode;
      }
      return result;
  },
  getOpen: function (n, r) {
    // get the html "open-tag" of a node
    function getOpenTag(n) {
      var attr, copy;
      copy = n.cloneNode(false);
      if (!copy) {
        return '';
      }
      copy.innerHTML = '';
      attr = '';
      attr = $(copy)[0].outerHTML
               .replace(new RegExp( '<'  + copy.nodeName, "i"), '')
               .replace(new RegExp( '</' + copy.nodeName + '>', "i" ), '');
      return '<' + copy.nodeName.toLowerCase() + attr;
    };

    var result = '';
    while (n) {
      if (n == r)
        break;
      result = getOpenTag(n) + result;
      n = n.parentNode;
    }
    return result;
    }
}