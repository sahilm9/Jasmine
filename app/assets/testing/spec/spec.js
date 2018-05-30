/*
Unit tests, test parts of an application, (or units). Very commonly, each unit is tested individually and independently to ensure an application is running as expected

What we need?
 - We need a framework or library to write tests
 - A way of describing the code we are testing
 - A tool where we can make assertions or expectations about our code
 - One Solution - JASMINE
 ->  Comes with everything we need to test our code
 -> Works well with all kinds of JavaScript environments
 -> Simple syntax to quickly get up and running with

Essential Keywords
- describe , can think of, talking to somone and telling them 'let me describe _ to you'
very often, we will have one describe block for one function or for one unit we are testing
- it, is used inside of describe functions and inside it, we write code that explains more detail about what we expect this piece of functionality to do , similar to , now that i described, let me tell you something more in detail, 'let me tell you about _', each 'it' function corresponds to a test and if often called spec
- expect, lives inside it and where we make expectations or assertions about the functionality, if one of our expectations isn't met, test or spec fails
*/

var mercury = {
  isRound: true,
  numberFromSun:1
}

describe('Mercury', function(){ // 'describe' and 'it' accept a string and this is what appears in the browser, the second parameter is a callback function
  it('is round', function(){
    expect(mercury.isRound).toBe(true);// expect function returns an object to us which we can attach other methods to, these we attach on to expect function returned object are called matchers
    // toBe which uses '===' comparision operator and compares the result of expect function with the value we passed it.
  });
  it('is the first planet from the sun', function(){
    expect(mercury.numberFromSun).toBe(1);
  });
});

// matchers
/*
-> toBe/ not.toBe uses === to compare a value to another
-> toBeCloseTo, compares 2 values and accepts a second parameter for precision, useful when something is similar but not exactly the same
-> toBeDefined, useful when making sure certain variables have specific values and not undefined
toBeTruthy/toBeFalsy -> useful when we expect a value when converted to a boolean to be true or false
-> toBeGreather/toBeLessThan // When we expect a certain value to be less than or greater than some other value
-> toContain, to check if a value is contained in array
-> toEqual, To compare 2 objects with different references in memory.  toBe or '===' return false
-> jasmine.any() to check the type,
*/

// Hooks
/*
beforeEach accepts a callback that will be run before callback of each 'it' function
*/
describe('Arrays', function(){
  var arr;
  beforeEach(function(){
    arr = [1,2,3];
  });
  it('push', function(){
    arr.push({});// pushes and element at the end of the array
    expect(arr).toEqual([1,2,3,{}]); // uses '===' comparision to check array objects
  });
  it('unshift', function(){
    expect(arr.unshift(0)).toBe(4);// add's an element at the beginning of the array and returns the new length
  });
  it('shift', function(){
    expect(arr.shift()).toBe(1); // removes the element at the beginning of the array and returns the removed element
  });
  it('pop', function(){
    expect(arr.pop()).toBe(3); // removes the element at the end of the array and returns the remove element
  });
});

/*
afterEach, runs after each "it" callback, useful for teardown.
*/

describe('Counting', function(){
  var count =0;
  beforeEach(function(){
    count++;
  });
  afterEach(function(){
    count = 0;
  });

  it('has a counter to increment', function(){
    expect(count).toBe(1);
  });
  it('gets reset', function(){
    expect(count).toBe(1);
  });
});


/*
If we want a variable to persist among all tests, we can use beforeAll/afterAll hooks, run before/after all tests, does not rest in between
*/

var arr = [];
beforeAll(function(){
  arr =[1,2,3];
});

describe('Counting with beforeAll', function(){
  it('begins with array', function(){
    arr.push(4);
    expect(1).toBe(1);
  });
  it('butate Array', function(){
    arr.push(5);
    expect(1).toBe(1);
  });
});
describe('bounting again with beforeAll', function(){
  it('Mutate array again', function(){
    expect(1).toBe(1);
  });
});


// Nesting describe blocks

describe('Array Methods', function(){
  var array;
  beforeEach(function(){
    array = ['HTML', 'CSS', 'JavaScript', 'React'];
  });

  describe('slice', function(){
    it('new copy of portion of array', function(){
      expect(array.slice(1,3)).toEqual(['CSS','JavaScript']);
    });
  });

  describe('splice', function(){
    it('changes contents of array', function(){
      array.splice(2,0,'jQuery');
      expect(array).toEqual(['HTML', 'CSS','jQuery', 'JavaScript', 'React']);
    });
  });
});

//Pending tests
describe('Pending specs', function(){
  xit('Can start with an xit', function(){
    expect(true).toBe(true);
  });
  it('is pending test, if no callback is provided');
  it('is also a pending spec, if pending function is invoked inside the callback', function(){
    expect(false).toBe(false);
    pending();
  });
});


/*
If the testing of one unit is more than one expect, use more 'it' blocks
*/


// Spies
/*
Mocking in testing, Unit test strives to isolate specific functionality and how this funcitonality behaves under variety of circumstances, unfortunately many functions or objects may depend on other parts of the application, these can include other functions, data sources or even previously executed functions, in these kind of situations mocking comes into play.A mock is fake object that poses as a function without having to go overhead of creating a real function. When you create a mock object, you create a fake object that takes place of real object, we can then define what methods are called and then return values from mock object. Mock can be used to retrieve certain values like how many times a mock function was called, what value function returned and how many parameters was the function called with. In Jasmine, mocks are referred to as Spies
-> A spy can stub(mimic) any function and track calls to it and all arguments
-> Spies only exists in the 'describe' or 'it' block in which they are defined.
-> Spies are removed after each spec.
-> There are 2 ways to create a Spy in Jasmine
a) spyOn, can only be used when method exists on an object
b) Jasmine.createSpy will return a brand new function
--> When spying on existing function, make sure to use spyOn
*/

function multiply(a,b){ // functions in global scope are attached to window object
  return a*b;
}

describe('Multiply', function(){
  var mulSpy, result;
  beforeEach(function(){
    // To make sure we store return value to see value returned from spy
    mulSpy = spyOn(window, 'multiply').and.callThrough();
    result = mulSpy(1,2);

  });
  it("is called", function(){
    // Testing to see if spy has been called
    expect(mulSpy).toHaveBeenCalled();
  });
  it('is called with parameters', function(){
    // Testing to see if spy has been called with parameters
    expect(mulSpy).toHaveBeenCalledWith(1,2);
  });
  it('is return value', function(){
    expect(result).toEqual(2);
  });
  it('is frequency of invocations', function(){
    expect(mulSpy.calls.any()).toBe(true);
    expect(mulSpy.calls.count()).toBe(1);
  });
});

// How to test time dependent code and asynchronous code
/*
Clock
-> The Jasmine Clock is available for testing time dependent code
-> It is installed by invoking jasmine.clock().install()
-> Uninstall the clock after you are done to restore the original functions
*/


describe('Simple setTimeout', function(){
  var sample;
  beforeEach(function(){
    sample = jasmine.createSpy('sampleFunction');
    jasmine.clock().install();
  });
  afterEach(function(){
    jasmine.clock().uninstall();
  });

  it('Only invoked after 1000 milliseconds', function(){
    setTimeout(function(){
      sample();
    },1000);
    jasmine.clock().tick(999);
    expect(sample).not.toHaveBeenCalled();
    jasmine.clock().tick(1);
    expect(sample).toHaveBeenCalled();
  });
});



describe('Simple setInterval', function(){
  var sample;
  beforeEach(function(){
    sample = jasmine.createSpy('sampleFunction');
    jasmine.clock().install();
  });
  afterEach(function(){
    jasmine.clock().uninstall();
  });

  it('Only invoked after 1000 milliseconds', function(){
    setInterval(function(){
      sample();
    },1000);
    jasmine.clock().tick(999);
    expect(sample.calls.count()).toBe(0);
    jasmine.clock().tick(1000);
    expect(sample.calls.count()).toBe(1);
    jasmine.clock().tick(1);
    expect(sample.calls.count()).toBe(2);
    jasmine.clock().tick(500);
    expect(sample.calls.count()).toBe(2);
    jasmine.clock().tick(500);
    expect(sample.calls.count()).toBe(3);
  });
});

/*
Testing async code
Jasmine also has support for running specs that require testing async code
beforeAll, afterAll, beforeEach, afterEach and it takes an optional single argument( commonly called 'done') that should be called when the async work is compvare.
A test will not compvare unitl its 'done' is called.
*/

function getUserDetails(username){
  return $.getJSON('https://api.github.com/users/' + username);
}

describe('getUserDetails', function(){
  it('returns correct name of user', function(done){
    getUserDetails('sahilm9').then(function(data){
      expect(data.name).toBe('Sahil Mokkapati');
      done();
    });
  });
});

// TDD - Test Driven Development
/*
->The idea of TDD is you write your test before you write your application code
-> We follow a pattern called Red, Green, refactor, we develop the product by start writing tests
a) We first write test's, since thereisn't any code, these test's will fails.
b) After we see test's fail, we write the code necessary to pass the test's
c) We then refactor the code as needed
d) As long as test's are passing, we can be fairly confident that we are not introducing new bugs into the program
e) Repeat
Jasmine describes itself as BDD- Behavior Driven Development framework,
BDD is a subset of TDD, two are not mutually exclusive, We can BDD without TDD and vice versa
The idea behind BDD is that when writing test's we describe the behavior of our functionality and not just what we expect. When we use functions like describe and it, the parameter to each of these is a string to describe how we want the behavior of what we are testing
BDD involes being verbose with our style and describing the behavior of the functionality
Helpful when testing the design of the software
*/


// Other kinds of tests
/*
Unit Testing: At first, you probably be writing mostly unit test's, these are test's which are written for one small component of our application and they are meant to test the individual pieces of our application. Unit tests are written for the purpose of proving the units or parts of the application behave as expected before they are put together. Although it helps with each unit, our application may fail when units are combined, this leads us to integration testing
Integration Testing: Integration testing is meant to test the integration of our units or larger parts of our application. Here we test more than one unit and how they function together. Integration testing is built of unit of testing.
Acceptance Testing: Acceptance testing involves performing testing on the full system which could be using our application on the browser or device to see whether application functionalities satifies the specifications provided. Here we are simply testing to see, if something is accepted or not. The purpose of acceptance tests is to evaluate the entire business or system requirements and not to test how one unit or multiple units are integrated together.
Stress Testing: It is to determine how effective our application can be under unfavorable conditions, these conditions include system going down, high traffic or other kinds of scenarios, that maybe not be common but happen to an application.
*/











