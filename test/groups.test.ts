import {test} from "@jest/globals"
import {expectArrayEquivalence} from "../src/engine/Jest"
import {debugGroups} from "../src/features/debug"
import {Block} from "../src/types/Block"

const R: Block = 'red'
const G: Block = 'green'
const P: Block = 'purple'
const Y: Block = 'yellow'
const B: Block = 'blue'

test("groups1", () => expectArrayEquivalence(debugGroups([
    [ B,  Y,  R,  P,  G,  R,  Y,  R],
    [ B,  B,  G,  Y,  P,  Y,  B,  P],
    [ Y,  G,  P,  P,  P,  R,  G,  Y],
    [ Y,  G,  R,  Y,  Y,  Y,  R,  G],
    [ P,  R,  R,  P,  P,  P,  P,  P],
    [ P,  P,  R,  R,  G,  Y,  B,  Y],
    [ P,  R,  R,  P,  P,  Y,  P,  Y],
    [ Y,  P,  G,  Y,  P,  B,  B,  G],
]), [
    [ 1,  2,  3,  4,  5,  6,  7,  8],
    [ 1,  1,  9, 10, 11, 12, 13, 14],
    [15, 16, 11, 11, 11, 18, 19, 20],
    [15, 16, 21, 22, 22, 22, 23, 24],
    [25, 21, 21, 27, 27, 27, 27, 27],
    [25, 25, 21, 21, 28, 29, 30, 31],
    [25, 21, 21, 32, 32, 29, 33, 31],
    [34, 35, 36, 37, 32, 38, 38, 39],
]))

test("groups2", () => expectArrayEquivalence(debugGroups([
    [ B,  Y,  B,  B,  B,  P,  P,  P],
    [ B,  G,  Y,  B,  B,  R,  B,  G],
    [ G,  Y,  R,  Y,  G,  R,  Y,  R],
    [ Y,  P,  R,  Y,  R,  G,  P,  B],
    [ B,  R,  Y,  B,  B,  G,  P,  Y],
    [ Y,  P,  Y,  G,  Y,  R,  B,  R],
    [ P,  R,  G,  R,  R,  G,  G,  R],
    [ G,  G,  G,  B,  R,  R,  P,  R],
]), [
    [ 1,  2,  3,  3,  3,  4,  4,  4],
    [ 1,  5,  6,  3,  3,  7,  8,  9],
    [10, 11, 12, 13, 14,  7, 15, 16],
    [17, 18, 12, 13, 19, 20, 21, 22],
    [23, 24, 25, 26, 26, 20, 21, 27],
    [28, 29, 25, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 38, 39, 39, 34],
    [37, 37, 37, 41, 38, 38, 42, 34],
]))

test("groups3", () => expectArrayEquivalence(debugGroups([
    [ Y,  R,  G,  R,  G,  B,  G,  P],
    [ R,  Y,  Y,  B,  P,  G,  G,  B],
    [ P,  G,  P,  R,  R,  R,  Y,  R],
    [ Y,  B,  G,  P,  G,  Y,  Y,  R],
    [ P,  R,  Y,  B,  B,  B,  R,  R],
    [ P,  G,  P,  G,  R,  B,  Y,  R],
    [ G,  B,  B,  G,  R,  G,  P,  G],
    [ B,  B,  Y,  B,  R,  P,  B,  G],
]), [
    [ 1,  2,  3,  4,  5,  6,  7,  8],
    [ 9, 10, 10, 11, 12,  7,  7, 14],
    [15, 16, 17, 18, 18, 18, 19, 20],
    [21, 22, 23, 24, 25, 19, 19, 20],
    [27, 28, 29, 30, 30, 30, 20, 20],
    [27, 31, 32, 33, 34, 30, 35, 20],
    [36, 37, 37, 33, 34, 38, 39, 40],
    [37, 37, 42, 43, 34, 44, 45, 40],
]))

test("groups4", () => expectArrayEquivalence(debugGroups([
    [ R,  B,  Y,  Y,  G,  R,  Y,  R],
    [ R,  G,  Y,  B,  Y,  G,  B,  P],
    [ P,  B,  B,  B,  Y,  Y,  G,  R],
    [ R,  B,  G,  R,  P,  R,  R,  R],
    [ P,  P,  B,  Y,  G,  Y,  G,  B],
    [ R,  Y,  R,  Y,  R,  B,  B,  G],
    [ Y,  G,  B,  G,  B,  G,  P,  P],
    [ B,  Y,  Y,  R,  G,  Y,  P,  G],
]), [
    [ 1,  2,  3,  3,  4,  5,  6,  7],
    [ 1,  8,  3,  9, 10, 11, 12, 13],
    [14,  9,  9,  9, 10, 10, 16, 17],
    [18,  9, 19, 20, 21, 17, 17, 17],
    [23, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 25, 33, 34, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 42],
    [43, 44, 44, 45, 46, 47, 42, 48],
]))

test("groups5", () => expectArrayEquivalence(debugGroups([
    [ R,  R,  P,  B,  R,  Y,  G,  G],
    [ R,  G,  G,  Y,  B,  P,  G,  P],
    [ P,  G,  Y,  R,  P,  Y,  R,  R],
    [ R,  B,  P,  G,  G,  B,  Y,  B],
    [ G,  Y,  R,  R,  G,  P,  P,  P],
    [ R,  B,  R,  Y,  P,  B,  Y,  Y],
    [ R,  P,  Y,  Y,  G,  R,  P,  B],
    [ R,  R,  Y,  P,  R,  R,  R,  B],
]), [
    [ 1,  1,  2,  3,  4,  5,  6,  6],
    [ 1,  7,  7,  8,  9, 10,  6, 11],
    [12,  7, 13, 14, 15, 16, 17, 17],
    [18, 19, 20, 21, 21, 22, 23, 24],
    [25, 26, 27, 27, 21, 28, 28, 28],
    [29, 30, 27, 31, 32, 33, 34, 34],
    [29, 35, 31, 31, 37, 38, 39, 40],
    [29, 29, 31, 41, 38, 38, 38, 40],
]))

test("groups6", () => expectArrayEquivalence(debugGroups([
    [ B,  B,  G,  P,  Y,  Y,  B,  Y],
    [ G,  P,  Y,  G,  Y,  R,  Y,  Y],
    [ B,  Y,  G,  G,  P,  R,  B,  G],
    [ Y,  P,  B,  R,  B,  P,  B,  G],
    [ Y,  Y,  R,  Y,  Y,  P,  R,  P],
    [ G,  G,  B,  G,  G,  B,  P,  P],
    [ G,  B,  P,  Y,  G,  B,  P,  G],
    [ G,  P,  B,  B,  R,  G,  B,  B],
]), [
    [ 1,  1,  2,  3,  4,  4,  5,  6],
    [ 7,  8,  9, 10,  4, 11,  6,  6],
    [13, 14, 10, 10, 16, 11, 17, 18],
    [19, 20, 21, 22, 23, 24, 17, 18],
    [19, 19, 25, 26, 26, 24, 27, 28],
    [29, 29, 30, 31, 31, 32, 28, 28],
    [29, 34, 35, 36, 31, 32, 28, 37],
    [29, 38, 39, 39, 40, 41, 42, 42],
]))

test("groups7", () => expectArrayEquivalence(debugGroups([
    [ B,  B,  Y,  R,  P,  G,  P,  G],
    [ P,  P,  Y,  P,  R,  P,  Y,  B],
    [ Y,  G,  G,  Y,  Y,  B,  Y,  G],
    [ Y,  B,  Y,  R,  G,  R,  Y,  B],
    [ P,  G,  P,  P,  G,  G,  Y,  R],
    [ B,  B,  P,  R,  G,  B,  P,  R],
    [ Y,  B,  P,  G,  G,  Y,  Y,  Y],
    [ P,  Y,  P,  P,  B,  P,  Y,  B],
]), [
    [ 1,  1,  2,  3,  4,  5,  6,  7],
    [ 8,  8,  2,  9, 10, 11, 12, 13],
    [14, 15, 15, 16, 16, 17, 12, 18],
    [14, 19, 20, 21, 22, 23, 12, 24],
    [25, 26, 27, 27, 22, 22, 12, 28],
    [29, 29, 27, 30, 22, 31, 32, 28],
    [33, 29, 27, 22, 22, 34, 34, 34],
    [35, 36, 27, 27, 37, 38, 34, 39],
]))
