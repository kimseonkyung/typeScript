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
let myAddA = function(x, y) { return x + y };


// 위의 예시에 타입을 더한다.
function addB(x: number, y: number): number {
  return x + y;
}

let myAddB = function(x: number, y: number): number { return x + y };


/**
 * 함수 타입 작성하기
 *
 * 함수의 타입은 매개변수의 타입과 반환 타입이 있다.
 * 전체 함수 타입을 작성하고자 한다면 이 두 가지 타입이 필요하다.
 * 매개변수의 타입들이 올바르게 나열되어 있다면 함수 타입에 이름을 붙이더라도 유효한 타입으로 간주한다.
 * 매개변수 타입들과 반환 타입 사이에 '화살표 표기'( => )를 써서 반환 타입을 분명히 할 수 있다.
 * 만약 함수가 값을 반환하지 않는다면 비워두는 대신 void를 써서 표시한다.
 */

let myAddC: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number { return x + y; };

/**
 * 타입의 추론
 */

// myAdd는 전체 함수 타입을 가집니다
let myAddD = function(x: number, y: number): number { return  x + y; };

// 매개변수 x 와 y는 number 타입을 가집니다
let myAddE: (baseValue: number, increment: number) => number =
  function(x, y) { return x + y; };

/**
 * 선택적 매개변수와 기본 매개변수
 *
 * TypeScript 에서는 모든 매개변수가 함수에 필요하다고 가정한다.
 * 함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치해야 한다..
 */

function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확함


/**
 * JavaScript 에서는 모든 매개변수가 선택적이고, 사용자는 적합하다고 생각하면 그대로 둘 수 있다.
 * TypeScript 에서도 선택적 매개변수를 원한다면 매개변수 이름 끝에 ? 를 붙임으로써 해결할 수 있다.
 */
function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

let result4 = buildName("Bob");                  // 지금은 바르게 동작
let result5 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result6 = buildName("Bob", "Adams");         // 정확함
