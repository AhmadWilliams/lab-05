namespace SpriteKind {
    export const coin = SpriteKind.create()
}
function Tilemap () {
    mySprite = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, player_speed, 0)
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 8))
    mySprite.ay = gravity
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = jump_speed
    }
})
function enemies () {
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        mySprite3 = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        mySprite3.vx = enemy_speed
        mySprite3.setBounceOnWall(true)
        tiles.placeOnTile(mySprite3, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(coin_value)
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardWater, function (sprite, location) {
    game.gameOver(false)
})
function coins () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        mySprite2 = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.coin)
        tiles.placeOnTile(mySprite2, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.skillmap.islandTile4, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
    sprites.destroy(mySprite3)
})
let mySprite2: Sprite = null
let mySprite3: Sprite = null
let mySprite: Sprite = null
let player_speed = 0
let coin_value = 0
let jump_speed = 0
let enemy_speed = 0
let gravity = 0
tiles.setCurrentTilemap(tilemap`level1`)
gravity = 100
enemy_speed = 50
jump_speed = -100
coin_value = 1
player_speed = 100
Tilemap()
coins()
enemies()
