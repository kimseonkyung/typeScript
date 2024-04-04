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

const arr1: number[] = [1, 2, 3];
const arr2: string[] = ["a", "b", "c"];

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

function getFavoriteNumber1(): number {
  return 50;
}

async function getFavoriteNumber2(): Promise<number> {
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

function printName1(obj: { first: string; last?: string }) {
  console.log(obj.first, obj.last);
}

printName1({ first: "Bob" });
printName1({ first: "Alice", last: "Alisson" });

// 존재하지 않는 속성에 엑세스하면 런타임 오류가 아닌 undefined를 얻는다.
function printName2(obj: { first: string; last?: string }) {
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

function printId1(id: number | string) {
  console.log(`Your ID is: ${id}`);
}

// OK
printId1(101);
// OK
printId1("202");
// Error
printId1({ myID: 22342 });

// 유니온 타입인 값이 있으면, 유니언에 있는 모든 타입에 공통적인 멤버들에만 접근 가능하다.
function printId2(id: number | string) {
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

function printCoord2(pt: Point) {
  console.log(`The coordinate's x value is ${pt.x}`);
  console.log(`The coordinate's y value is ${pt.y}`);
}

printCoord2({ x: 100, y: 100 });

// 유니온 타입 지정
type ID = number | string;
