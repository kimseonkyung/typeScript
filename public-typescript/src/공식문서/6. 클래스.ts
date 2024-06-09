/**
 * 클래스
 *
 * 기존 JavaScript는 재사용할 수 있는 컴포넌트를 만들기 위해 함수와 프로토타입-기반 상속을 사용했다.
 * 하지만 객체 지향 접근 방식에 익숙한 프로그래머 입장에서는 클래스가 함수를 상속받고 이런 클래스에서 객체가 만들어지는 것에
 * 다소 어색함을 느낌 수 있다. es6부터 객체 지향 클래스 기반의 접근 방식을 만들 수 있다.
 */

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

let greeter = new Greeter('world')


