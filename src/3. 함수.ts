/**
 * JavaScript 에서처럼, 함수는 함수 외부의 변수를 참조할 수 있다. (클로저)
 * 이런 경우를, 변수를 캡처(capture) 한다고 한다.
 * 이것이 어떻게 동작하는지, 이 기술을 사용했을 때의 장단점을 이해하자.
 */

// 기명 함수
function addA(x, y) {
  return x + y;
}

// 익명 함수
let myAddA = function (x, y) {
  return x + y;
};

// 위의 예시에 타입을 더한다.
function addB(x: number, y: number): number {
  return x + y;
}

let myAddB = function (x: number, y: number): number {
  return x + y;
};

/**
 * 함수 타입 작성하기
 *
 * 함수의 타입은 매개변수의 타입과 반환 타입이 있다.
 * 전체 함수 타입을 작성하고자 한다면 이 두 가지 타입이 필요하다.
 * 매개변수의 타입들이 올바르게 나열되어 있다면 함수 타입에 이름을 붙이더라도 유효한 타입으로 간주한다.
 * 매개변수 타입들과 반환 타입 사이에 '화살표 표기'( => )를 써서 반환 타입을 분명히 할 수 있다.
 * 만약 함수가 값을 반환하지 않는다면 비워두는 대신 void를 써서 표시한다.
 */

let myAddC: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

/**
 * 타입의 추론
 */

// myAdd는 전체 함수 타입을 가집니다
let myAddD = function (x: number, y: number): number {
  return x + y;
};

// 매개변수 x 와 y는 number 타입을 가집니다
let myAddE: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};

/**
 * 선택적 매개변수와 기본 매개변수
 *
 * TypeScript 에서는 모든 매개변수가 함수에 필요하다고 가정한다.
 * 함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치해야 한다.
 */

function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // 오류, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams"); // 정확함

/**
 * JavaScript 에서는 모든 매개변수가 선택적이고, 사용자는 적합하다고 생각하면 그대로 둘 수 있다.
 * TypeScript 에서도 선택적 매개변수를 원한다면 매개변수 이름 끝에 ? 를 붙임으로써 해결할 수 있다.
 * 선택적 매개변수는 필수 매개변수 뒤에 위치해야 한다.
 * lastName 대신 firstName을 선택적으로 하고 싶다면 매개변수의 순서를 변경해야 한다.
 */
function buildNameA(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1A = buildNameA("Bob"); // 지금은 바르게 동작
let result2A = buildNameA("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result3A = buildNameA("Bob", "Adams"); // 정확함

/**
 * TypeScript에서는 유저가 값으 제공하지 않거나 undefined로 했을 때에 할당될 매개변수의 값을
 * 정해 놓을 수 있다.
 * 순수한 선택적 매개변수와는 다르게 필수 매개변수 뒤에 오는 것이 강요되지 않습니다.
 */
function buildNameB(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1B = buildNameB("Bob"); // 올바르게 동작, "Bob Smith" 반환
let result2B = buildNameB("Bob", undefined); // 여전히 동작, 역시 "Bob Smith" 반환
let result3B = buildNameB("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result4B = buildNameB("Bob", "Adams"); // 정확함

/**
 * 나머지 매개변수 (Rest Parameters)
 *
 * 필수, 선택적, 기본 매개변수는 한 번에 하나의 매개변수만을 가지고 이야기 한다.
 * 때로는 다수의 매개변수를 그룹 지어 작업하기를 원하거나,
 * 함수가 최종적으로 얼마나 많은 매개변수를 취할지 모를 때도 있다.
 * JavaScript에서는 모든 함수 내부에 위치한 arguments라는 변수를 사용해 직접 인자를 가지고 작업할 수 있다.
 * TypeScript에서는 이 인자들을 하나의 변수로 모을 수 있다.
 */

function buildNameC(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// employeeName 은 "Joseph Samuel Lucas MacKinzie" 가 될것입니다.
let employeeName = buildNameC("Joseph", "Samuel", "Lucas", "MacKinzie");

/**
 * 나머지 매개변수는 선택적 매개변수들의 수를 무한으로 취급한다.
 * 나머지 매개변수를 인자로 넘겨줄 때 원하는 만큼 넘겨주거나 아무것도 안 넘겨줄 수 있다.
 * 컴파일러는 생략 부호 (...) 뒤의 이름으로 전달된 인자 배열을 빌드하여 함수에서 사용할 수 있도록 한다.
 * 생략 부호는 나머지 매개변수가 있는 함수의 타입에도 사용된다.
 */

function buildNameD(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildNameD;

/**
 * this
 *
 * 화살표 함수 (this and arrow functions)
 *
 * JavaScript에서, this는 함수가 호출될 때 정해지는 변수이다.
 * 매우 강력하고 유연한 기능이지만 이것은 항상 함수가 실행되는
 * 콘텍스트에 대해 알아야 한다는 수고가 생긴다.
 * 특히 함수를 반환하거나 인자로 넘길 때의 혼란스러움은 악명이 높다.
 */

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }; // this에 오류
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

/**
 * createCardPicker가 자기 자신을 반환하는 함수임을 주목하자
 * createCardPicker에 의해 생성된 함수에서 사용 중인 this가
 * deck 객체가 아닌 window에 설정되었기 때문이다.
 * cardPicker()의 자체적인 호출 때문에 생긴 일이다.
 * 최상위 레벨에서의 비-메서드 문법의 호출은 this를 window로 한다.
 * (Note: strict mode에서는 this가 window 대신 undefined 가 된다.)
 *
 * 이 문제는 나중에 사용할 함수를 반환하기 전에 바인딩을 알맞게 하는 것으로 해결할 수 있다.
 * 이 방법대로라면 나중에 사용하는 방법에 상관없이 원본 deck 객체를 계속해서 볼 수 있다.
 * 이를 위해, ES6의 화살표 함수로 변경한다.
 * 화살표 함수는 함수가 호출 된 곳이 아닌 함수가 생성된 쪽의 this를 캡처한다.
 */

let deckA = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: 아랫줄은 화살표 함수로써, 'this'를 이곳에서 캡처할 수 있도록 합니다
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPickerA = deck.createCardPicker();
let pickedCardA = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

/**
 * this 매개변수 (this parameter)
 *
 * this.suits[pickedSuit]의 타입은 any 이다.
 * this가 객체 리터럴 내부의 함수에서 왔기 때문이다.
 * 이것을 고치기 위해 명시적으로 this 매개변수를 줄 수 있다.
 * this 매개변수는 함수의 매개변수 목록에서 가장 먼저 나오는 가짜 매개변수이다.
 */

function f(this: void) {
  // 독립형 함수에서 `this`를 사용할 수 없는 것을 확인함
}

// 명확하고 재사용하기 쉽게 Card와 Deck 두 가지 인터페이스 타입들을 예시에 추가했다.

interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deckB: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // 아래 함수는 이제 callee가 반드시 Deck 타입이어야 함을 명시적으로 지정합니다.
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPickerB = deck.createCardPicker();
let pickedCardB = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

/**
 * 콜백에서 this 매개변수 (this parameters in callbacks)
 *
 * 나중에 호출할 콜백 함수를 라이브러리에 전달할 때 this 때문에 오류가 발생할 수 있다.
 * 라이브러리는 콜백을 일반 함수처럼 호출하므로 this는 undefined가 된다.
 * 일부 작업에서는 this 매개변수를 콜백 오류를 막는데 사용할 수 있다.
 * 먼저 라이브러리 작성자는 콜백 타입을 this로 표시를 해주어야 한다.
 */

interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

/**
 * this: void는 addClickListener가 onclick이 this타입을 요구하지 않는
 * 함수가 될 것으로 예상하는 것을 의미한다.
 * 두 번째로, 호출 코드를 this로 표시한다.
 */

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // this가 여기서 사용됨, 이 콜백을 쓰면 런타임에서 충돌이 일어난다.
    this.info = e.message;
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // 오류!

/**
 * this로 표시를 한 상태에서 onClickBad가 반드시 Handler의 인스턴스로써 호출되어야 함을 명시해 주어야 한다.
 * 그러면 TypeScript는 addClickListener가 this: void를 갖는 함수를 필요로 한다는 것을 감지한다.
 * 오류를 고치기 위해 this의 타입을 바꿔준다.
 */

class HandlerA {
  info: string;
  onClickGood(this: void, e: Event) {
    // void 타입이기 때문에 this는 이곳에서 쓸 수 없습니다!
    console.log("clicked!");
  }
}
let hA = new Handler();
uiElement.addClickListener(hA.onClickGood);

/**
 * onClickGood이 this 타입을 void로 지정하고 있기 때문에 addClickListener로 넘겨지는데 적합하다.
 * 물론, 이것이 this.info를 쓸 수 없는 것을 의미하기도 하다.
 * 만약 this.info까지 원한다면 화살표 함수를 사용해야 한다.
 */

class HandlerB {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}

/**
 * 화살표 함수가 외부의 this를 사용하기 때문에 가능하므로
 * this: void일 것으로 기대하는 무언가라면 전달에 문제가 없다.
 * Handler 타입 객체마다 하나의 화살표 함수가 작성된다는 점이 단점이다.
 * 반면, 메서드들은 하나만 작성되어 Handler의 프로토타입에 붙는다.
 * Handler 타입의 모든 객체 간에 공유된다.
 */

/**
 * 오버로드 (Overloads)
 *
 * JavaScript는 본질적으로 매우 동적인 언어이다.
 * 하나의 JavaScript 함수가 전달된 인자의 형태에 따라 다른 타입의 객체들을 반환하는 것은 흔한 일이다.
 */

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
  // 인자가 배열 또는 객체인지 확인
  // 만약 그렇다면, deck이 주어지고 card를 선택합니다.
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // 그렇지 않다면 그냥 card를 선택합니다.
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

/**
 * 여기 사용자가 전달하는 것에 따라 두 가지 다른 결과를 반환하는 함수가 있다.
 * 사용자가 deck을 의미하는 객체 값을 전달한다면 함수가 카드를 선택한다.
 * 사용자가 카드를 선택하면 선택한 카드가 무엇인지 알려준다.
 * 타입 시스템에서 이것을 어떻게 구현하는지 알아보자
 *
 * 오버로드 목록으로 동일한 함수에 다중 함수 타입을 제공한다.
 * 오버로드 목록은 컴파일러가 함수 호출들을 해결할 때 사용하는 것이다.
 * 오버로드 목록으로 pickCard가 동작을 승인하고 반환하는 것을 구현해보자
 */

let suitsA = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  // 인자가 배열 또는 객체인지 확인
  // 만약 그렇다면, deck이 주어지고 card를 선택합니다.
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // 그렇지 않다면 그냥 card를 선택합니다.
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

/**
 * 이 변화를 통해, 오버로드는 pickCard 함수에 대해 타입 검사 호출을 제공한다.
 * 컴파일러가 알맞은 타입 검사를 하기 위해서, JavaScript와 비슷한 프로세스를 따른다.
 * 오버로드 목록에서 첫 번째 오버로드를 진행하면서 제공된 매개변수를 사용하여 함수를 호출하려고 시도한다.
 * 만약 일치하게 된다면 해당 오버로드를 알맞은 오버로드로 선택하여 작업을 수행한다.
 * 이러한 이유로 가장 구체적인 것부터 오버로드 리스팅을 하는 것이 일반적이다.
 * function pickCard(x): any는 오버로드 목록에 해당되지 않는다.
 * 그래서 두 가지 오버로드만을 가진다
 * 객체를 받는것 하나와 숫자를 받는 것 하나. 다른 매개변수 타입으로 pickCard를 호출하는 것은 오류가 발생한다.
 */
