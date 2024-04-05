/**
 * 기본 요소
 *
 * string : 문자열 값을 나타낸다.
 * number : 숫자 값을 나타내며 정수와 소수를 나타낸다 (int or float)
 * boolean : true, flase 두 값을 나타낸다.
 */

const a: string = "문자열";
const b: number = 67;
const c: boolean = true;

/**
 * 배열
 *
 * 배열 타입을 의미한다.
 */

const arr: number[] = [1, 2, 3];
const arr: string[] = ["a", "b", "c"];

/**
 * any
 *
 * 특정 값으로 인해 타입 검사 오류가 발생하는 것을 원치 않을때 사용하는 특수 타입이다.
 * 모든 항목에 할당 할 수 있으며 긴 타입을 작성하고 싶지 않을 때 유용하다.
 */

/**
 * noImplicitAny
 *
 * 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어한다.
 * 설정을 하지 않으면 타입 추론시 any가 들어간다.
 * TypeScript은 타입을 포함할 때 가장 효과적이기 때문에 되도록이면
 * noImplicitAny을 설정하는게 좋다.
 */

/**
 * 타입 추론
 *
 * 일반적으로 타입을 명시하지 않아도 자동으로 추론하려고 시도한다.
 */

// type: string
let myName = "SK";

/**
 * 매개변수 타입 주석
 *
 * 함수를 선언할 때 각 매개변수 뒤에 타입 주석을 추가하여
 * 함수가 허용하는 매개변수 타입을 선언할 수 있다.
 * 매개변수 타입 주석은 매개변수 이름 뒤에 온다.
 */

function greet(name: string) {
  console.log(`Hello, ${name.toUpperCase()}!!`);
}

// string이 아닌 다른 타입을 넣으면 에러가 난다.
// greet(42);

/**
 * 반환 타입 주석
 *
 * 반환 타입 주석은 매개변수 목록 뒤에 나타난다.
 * 일반적으로 타입 추론을 하기때문에 명시하지 않아도 된다.
 */

function getFavoriteNumber(): number {
  return 50;
}

async function getFavoriteNumber(): Promise<number> {
  return 50;
}

/**
 * 익명 함수
 *
 * 익명 함수는 함수 선언과 약간 다르다.
 * TypeScript가 호출 방법을 결정할 수 있는 위치에 함수가 나타나면
 * 해당 함수의 매개 변수에 자동으로 타입이 지정된다.
 */

const names = ["Alice", "Bob", "Eve"];

// 매개변수 s에 string 타입이 지정된다.
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// 화살표 함수도 동일하게 적용된다.
names.forEach((s) => {
  console.log(s.toUpperCase());
});

/**
 * 객체 타입
 *
 * promise 이외에도 가장 일반적으로 접하게 되는 타입은 객체 타입이다.
 * 거의 모든 속성을 포함하는 JavaScript값을 나타낸다.
 * 개체 타입을 정의하려면 해당 속성과 타입을 나열하면 된다.
 */

function printCoord(pt: { x: number; y: number }) {
  console.log(`The coordinate's x value is ${pt.x}`);
  console.log(`The coordinate's y value is ${pt.y}`);
}

printCoord({ x: 3, y: 7 });

/**
 * 선택적 속성
 *
 * 객체 타입은 해당 속성 중 일부 또는 전체를 선택 사항으로 지정할 수 있다.
 * 속성 뒤에 ?를 추가하면 된다.
 */

function printName(obj: { first: string; last?: string }) {
  console.log(obj.first, obj.last);
}

printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// 존재하지 않는 속성에 엑세스하면 런타임 오류가 아닌 undefined를 얻는다.
function printName(obj: { first: string; last?: string }) {
  // obj.last에는 undefined가 올 수 있어서 에러가 발생한다.
  console.log(obj.last.toUpperCase());

  // obj.last에는 undefined가 정의되지 않음을 알 수 있다.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // 옵셔널 체이닝을 이용하면 안전하게 접근 가능하다.
  console.log(obj.last?.toUpperCase());
}

/**
 * 유니온 타입
 *
 * 둘 이상의 다른 타입을 조합하여 구성할 수 있다.
 */

function printId(id: number | string) {
  console.log(`Your ID is: ${id}`);
}

// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });

// 유니온 타입인 값이 있으면, 유니언에 있는 모든 타입에 공통적인 멤버들에만 접근 가능하다.
function printId(id: number | string) {
  // toUpperCase는 string만 접근 가능하다.
  console.log(id.toUpperCase());
}

function printId(id: number | string) {
  if (typeof id === "string") {
    // id가 string 이라는 것을 알 수 있어 에러가 나지 않는다.
    console.log(id.toUpperCase());
  } else {
    // id가 number 이다.
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // x는 string[] 이다.
    console.log(`Hello, ${x.join(" and ")}`);
  } else {
    // x는 string 이다.
    console.log(`Welcome lone traveler ${x}`);
  }
}

// 유니온 타입의 멤버가 모두 접근 가능한 경우도 있다.
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

/**
 * 타입 별칭
 *
 * 타입을 두번 이상 사용하고 단일 이름으로 참조하려는 경우 유용하다.
 * 모든 타입에 이름을 지정할 수 있다.
 */

type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log(`The coordinate's x value is ${pt.x}`);
  console.log(`The coordinate's y value is ${pt.y}`);
}

printCoord({ x: 100, y: 100 });

// 유니온 타입 지정
type ID = number | string;

/**
 * 인터페이스
 *
 * 인터페이스는 객체 타입의 이름을 지정하는 또 다른 방법이다.
 * TypeScript는 타입의 구조와 기능에만 관심이 있기 때문에
 * 구조적으로 타입이 지정된 타입 시스템이라고 부른다.
 */

interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log(`The coordinate's x value is ${pt.x}`);
  console.log(`The coordinate's y value is ${pt.y}`);
}

printCoord({ x: 100, y: 100 });

/**
 * 타입 별칭과 인터페이스의 차이점
 *
 * 타입 별칭과 인터페이스는 매우 유사하며 대부분의 경우 자유롭게 선택할 수 있다.
 * 타입 별칭의 모든 기능은 인터페이스에서 사용할 수 있다
 * 중요한 차이점은 항상 확장이 가능한 인터페이스와 달리
 * 타입 별칭은 새 속성을 추가 할 수 없다.
 */

// 인터페이스 확장
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

// 교차점을 통해 타입 확장
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;

// 기존 인터페이스에 새 필드 추가
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// 유형을 만든 후에는 변경할 수 없다.
type Window = {
  title: string;
};

// Error: Duplicate identifier 'Window'
type Window = {
  ts: TypeScriptAPI;
};

/**
 * 타입 주장(Assertions)
 *
 * 때로는 TypeScript가 알 수 없는 값 타입에 대한 정보를 갖게 될 것이다.
 * 예를 들어 document.getElementById를 사용하는 경우
 * TypeScript는 일종의 HTMLElement HTMLCanvasElement를 반환한다는 것만 알고 있지만
 * 페이지에는 항상 주어진 ID가 있다는 것을 알 수 있다.
 *
 * 이 상황에서는 타입 주장을 사용하여 보다 구체적인 타입을 지정할 수 있다.
 *
 * 타입 주석과 마찬가지로 타입 주장은 컴파일러에 의해 제거되며 코드의 런타임 동작에 영향을 주지 않는다.
 */

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// tsx에서는 꺽쇠 괄호 구문을 사용할 수도 있다.
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

// 타입 주장은 컴파일 타임에 제거되므로 타입 주장과 관련된 런타임 검사가 없다.
// null 타입 주장이 잘못된 경우 예외가 발생하거나 생성되지 않는다.
