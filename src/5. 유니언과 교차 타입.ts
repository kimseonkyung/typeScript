
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
