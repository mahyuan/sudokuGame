import $ from 'jquery'

class PopumNumbers {
  _$panel;
  _$targetCell

  constructor($panel) {
    this._$panel = $panel.hide().removeClass('hidden');
    this._$panel.on('click', 'span', event => {
      const $cell = this._$targetCell;
      const $span = $(event.target);
      /**
       * 1-9 回填数字
       * mark1 mark2 回填样式
       * empty 取消数字填写，取消mark
       */
      if ($span.hasClass('mark1')) {
        if ($cell.hasClass('mark1')) {
          $cell.removeClass('mark1');
        } else {
          $cell.removeClass('mark2').addClass('mark1');
        }
      } else if ($span.hasClass('mark2')) {
        if ($cell.hasClass('mark2')) {
          $cell.removeClass('mark2');
        } else {
          $cell.removeClass('mark1').addClass('mark2');
        }
      } else if ($span.hasClass('empty')) {
        $cell.text(0).addClass('empty');
      } else {
        $cell.removeClass('empty').text($span.text());
      }
      this.hide();
    });
  }

  popup($cell) {
    this._$targetCell = $cell;
    const { left, top } = $cell.position();
    this._$panel.css({
      left: `${left}px`,
      top: `${top}px`
    }).show();
  }

  hide() {
    this._$panel.hide();
  }
};

export default PopumNumbers;
