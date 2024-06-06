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

function printCoordA(pt: Point) {
  console.log(`The coordinate's x value is ${pt.x}`);
  console.log(`The coordinate's y value is ${pt.y}`);
}

printCoordA({ x: 100, y: 100 });

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

function printCoordB(pt: Point) {
  console.log(`The coordinate's x value is ${pt.x}`);
  console.log(`The coordinate's y value is ${pt.y}`);
}

printCoordB({ x: 100, y: 100 });

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

interface BearA extends Animal {
  honey: boolean;
}

const bearA = getBear();
bearA.name;
bearA.honey;

// 교차점을 통해 타입 확장
type AnimalA = {
  name: string;
};

type BearB = AnimalA & {
  honey: boolean;
};

const bearB = getBear();
bearB.name;
bearB.honey;

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
