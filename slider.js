'use strict';
    var multiItemSlider = (function () {
      return function (selector, config) {
        var
          _mainElement = document.querySelector(selector), // основный элемент блока
          _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
          _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width) + 24, // ширина одного элемента    
          _positionLeftItem = 0, // позиция левого активного элемента
          _transform = 0, // значение транфсофрмации .slider_wrapper
          _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
          _items = []; // массив элементов
            
        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getItemMin: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position < _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getItemMax: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position > _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getMin: function () {
            return _items[position.getItemMin()].position;
          },
          getMax: function () {
            return _items[position.getItemMax()].position;
          }
        }

        var _transformItem = function (direction) {
          var nextItem;
          if (direction === 'right') {
            _positionLeftItem++;
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
              nextItem = position.getItemMin();
              _items[nextItem].position = position.getMax() + 1;
              _items[nextItem].transform += _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform -= _step;
          }
          if (direction === 'left') {
            _positionLeftItem--;
            if (_positionLeftItem < position.getMin()) {
              nextItem = position.getItemMax();
              _items[nextItem].position = position.getMin() - 1;
              _items[nextItem].transform -= _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform += _step;
          }
          _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        function wheel(event) {
            var delta; // Направление скролла
            // -1 - скролл вниз
            // 1  - скролл вверх
            event = event || window.event;
            // Opera и IE работают со свойством wheelDelta
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                // В Опере значение wheelDelta такое же, но с противоположным знаком
                if (window.opera) delta = -delta;
            // В реализации Gecko получим свойство detail
            } else if (event.deltaY) {
                delta = -event.deltaY / 3;
            }
            // Запрещаем обработку события браузером по умолчанию
            if (event.preventDefault)  event.preventDefault();
            event.returnValue = false;
            console.log(delta);
            return delta;
        }

        
        // обработчик события click для скролла
        var _controlClick = function (e) {
          var direction = (wheel() < 0) ? 'right' : 'left';
          console.log(direction);
          e.preventDefault();
          _transformItem(direction);
        };

        // функции для обработки событий через интервал
        function _checkTimer(func, interval) {
            var lastCall = 0;
            return function() {
                var now = Date.now();
                if (lastCall + interval < now) {
                    lastCall = now;
                    console.log(lastCall);
                    return func.apply(this, arguments);
                }
            };
        }

        var _setUpListeners = function() {
          _sliderWrapper.addEventListener("mousewheel", _checkTimer(_controlClick, 800));
          _sliderWrapper.addEventListener("touchstart", _checkTimer(_controlClick, 800));
          /*_sliderWrapper.addEventListener("click", _checkTimer(_controlClick, 800));*/
          _sliderWrapper.addEventListener("DOMMouseScroll", _checkTimer(_controlClick, 800));
          _sliderWrapper.addEventListener("wheel", _checkTimer(_controlClick, 800));
        }

        // инициализация
        _setUpListeners();

        return {
          right: function () { // метод right
            _transformItem('right');
          },
          left: function () { // метод left
            _transformItem('left');
          }
        }

      }
    }());

    var slider = multiItemSlider('.slider')