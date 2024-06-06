/**
 * Typescript의 핵심 원칙 중 하나는 타입 검사가 값의 형태에 초점을 맞추고 있다는 것이다.
 * 이를 "덕 타이핑(duck typing)" 혹은 "구조적 서브타이핑 (structural subtyping)"이라고도 한다.
 * TypeScript에서, 인터페이스는 이런 타입들의 이름을 짓는 역할을 하고
 * 코드 안의 계약을 정의하는 것뿐만 아니라 프로젝트 외부에서 사용하는
 * 코드의 계약을 정의하는 강력한 방법이다.
 */

/**
 * 인터페이스
 */
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 * 타입 검사는 printLabel 호출을 확인한다.
 * printLabel 함수는 string 타입 label을 갖는 객체를 하나의 매개변수로 가진다.
 * 이 객체가 실제로는 더 많은 프로퍼티를 갖고 있지만,
 * 컴파일러는 최소한 필요한 프로퍼티가 있는지와 타입이 잘 맞는지만 검사한다.
 */

interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 * LabeledValue 인터페이스는 이전 예제의 요구사항을 똑같이 기술하는 이름으로 사용할 수 있다.
 * 이 인터페이스는 여전히 문자열 타입의 label 프로퍼티 하나를 가진다는 것을 의미한다.
 * 다른 언어처럼 printLabel에 전달한 객체가 이 인터페이스를 구현해야 한다고 명시적으로 얘기할 필요는 없다.
 * 여기서 중요한 것은 형태뿐이다.
 * 함수에 전달된 객체가 나열된 요구 조건을 충족하면, 허용된다.
 * 타입 검사는 프로퍼티들의 순서를 요구하지 않는다.
 * 단지 인터페이스가 요구하는 프로퍼티들이 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만을 확인한다.
 */

/**
 * 선택적 프로퍼티
 *
 * 인터페이스의 모든 프로퍼티가 필요한 것은 아니다.
 * 어떤 조건에서만 존재하거나 아예 없을 수도 있다.
 * 선택적 프로퍼티들은 객체 안의 몇 개의 프로퍼티만 채워 함수에 전달하는
 * "option bags" 같은 패턴을 만들 때 유용하다.
 */

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

/**
 * 선택적 프로퍼티를 가지는 인터페이스는 다른 인터페이스와 비슷하게 작성되고,
 * 선택적 프로퍼티는 선언에서 프로퍼티 이름 끝에 ?를 붙여 표시한다.
 * 선택적 프로퍼티의 이점은 인터페이스에 속하지 않는 프로퍼티의 사용을 방지하면서,
 * 사용 가능한 속성을 기술하는 것이다.
 * 예를 들어, createSquare안의 color 프로퍼티 이름을 잘못 입력하면, 오류 메시지로 알려준다.
 */

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

/**
 * 읽기전용 프로퍼티
 *
 * 일부 프로퍼티들은 객체가 처음 생성될 때만 수정 가능해야한다.
 *  프로퍼티 이름 앞에 readonly를 넣어서 이를 지정할 수 있다.
 */

interface Point {
  readonly x: number;
  readonly y: number;
}

// 객체 리터럴을 할당하여 Point를 생성합니다. 할당 후에는 x, y를 수정할 수 없다.
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 오류!

/**
 * TypeScript에서는 모든 변경 메서드(Mutating Methods)가 제거된 Array<T>와
 * 동일한 ReadonlyArray<T> 타입을 제공한다.
 * 그래서 생성 후에 배열을 변경하지 않음을 보장할 수 있다.
 */

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!

/**
 * 마지막 줄에서 ReadonlyArray를 일반 배열에 재할당이 불가능한 것을 확인할 수 있다.
 * 타입 단언(type assertion)으로 오버라이드하는 것은 가능하다.
 */

a = ro as number[];

/**
 * readonly vs const
 *
 * readonly와 const 중에 어떤 것을 사용할 지 기억하기 가장 쉬운 방법은
 * 변수와 프로퍼티중 어디에 사용할지 질문해 보는 것이다.
 * 변수는 const를 사용하고 프로퍼티는 readonly를 사용한다.
 */

/**
 * 초과 프로퍼티 검사
 *
 * 인터페이스의 첫 번째 예제에서 TypeScript가 { label: string; }을 기대해도
 * { size: number; label: string; }를 허용해주었다.
 * 또한 선택적 프로퍼티를 배우고, 소위 "option bags"을 기술할 때, 유용하다는 것을 배웠다.
 * 하지만, 그냥 그 둘을 결합하면 에러가 발생할 수 있다.
 */

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });

/**
 * createSquare의 매개변수가 color대신 colour로 전달된 것에 유의하자
 * 이 경우 JavaScript에선 경고가 발생한다.
 * width 프로퍼티는 적합하고, color 프로퍼티는 없고, 추가 colour 프로퍼티는
 * 중요하지 않기 때문에, 이 프로그램이 올바르게 작성되었다고 생각할 수 있다.
 * 하지만, TypeScript는 이 코드에 버그가 있을 수 있다고 생각한다.
 * 객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때,
 * 특별한 처리를 받고, 초과 프로퍼티 검사 (excess property checking)를 받는다.
 * 만약 객체 리터럴이 "대상 타입 (target type)"이 갖고 있지 않은
 * 프로퍼티를 갖고 있으면, 에러가 발생한다.
 */

// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });

// 이 검사를 피하는 가장 간단한 방법은 타입 단언을 사용하는 것이다.
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

/**
 * 하지만 특별한 경우에, 추가 프로퍼티가 있음을 확신한다면,
 * 문자열 인덱스 서명(string index signatuer)을 추가하는 것이 더 나은 방법이다.
 * 만약 SquareConfig color와 width 프로퍼티를 위와 같은 타입으로 갖고 있고,
 * 또한 다른 프로퍼티를 가질 수 있다면, 다음과 같이 정의할 수 있다.
 */

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

/**
 * 이 검사를 피하는 마지막 방법은 객체를 다른 변수에 할당하는 것이다.
 * squareOptions가 추가 프로퍼티 검사를 받지 않기 때문에, 컴파일러는 에러를 주지 않는다.
 * squareOptions와 SquareConfig 사이에 공통 프로퍼티가 있는 경우에만 이 방법을 사용할 수 있다.
 */

let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
