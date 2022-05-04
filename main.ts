namespace SpriteKind {
    export const badProjectile = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const ExitDoor = SpriteKind.create()
}
namespace StatusBarKind {
    export const keys = StatusBarKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jumpEnergy > 0) {
        mySprite.ay = mySprite.ay * -1
        pause(350)
        mySprite.ay = mySprite.ay * -1
        jumpergyBar.value += -25
        jumpEnergy += -1
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (facingLeft == 1) {
        frogSpit = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 6 6 6 6 6 6 6 6 1 1 . . . . 
            . 6 6 8 8 8 8 8 8 9 6 1 1 1 1 . 
            . 6 6 8 8 8 8 9 9 6 6 6 1 1 . . 
            . . 6 6 6 6 6 6 6 6 1 1 1 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, -300, 0)
    } else if (facingLeft == 0) {
        frogSpit = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 1 1 1 6 6 6 6 6 6 6 6 . . 
            . . 1 1 6 6 6 9 9 8 8 8 8 6 6 . 
            . 1 1 1 1 6 9 8 8 8 8 8 8 6 6 . 
            . . . . 1 1 6 6 6 6 6 6 6 6 . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 300, 0)
    }
    info.changeScoreBy(-1)
    sfxSpit.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExitDoor, function (sprite, otherSprite) {
    scene.setBackgroundColor(5)
    info.changeScoreBy(1000)
    music.beamUp.play()
    game.splash("nice!")
    MakeLevel()
})
function MakePlatzBar () {
    platzBar = statusbars.create(10, 4, StatusBarKind.Energy)
    platzBar.setLabel("platz")
    platzBar.positionDirection(CollisionDirection.Bottom)
    platzBar.setOffsetPadding(50, 8)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerPlatforms < 3) {
        tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), assets.tile`myTile1`)
        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), true)
        music.knock.play()
        playerPlatforms += 1
        platzBar.value += -33
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.baDing.play()
    keyCount += 1
    keysBar.value += 33
    if (keyCount == 3) {
        ExxitDoor = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . e e e e e e e e e . . . 
            . . . . 5 e e e e e e e e . . . 
            . . . . 5 e e e e e e e e . . . 
            . . . . e e e e e e e e e . . . 
            . . . . e e e e e e e e e . . . 
            . . . . e e e e e e e e e . . . 
            . . . . e e e e e e e 5 e . . . 
            . . . . e e e e e e e e e . . . 
            . . . . e e e e e e e e e . . . 
            . . . . 5 e e e e e e e e . . . 
            . . . . 5 e e e e e e e e . . . 
            . . . . e e e e e e e e e . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.ExitDoor)
        animation.runImageAnimation(
        ExxitDoor,
        [img`
            . . . . . . . . 3 . . . . . . . 
            . . . . . . . 3 a 3 . . . . . . 
            . . . . . . 3 a c a 3 . . . . . 
            . . . . . 3 a c . c a 3 . . . . 
            . . . . 3 a c . 3 . c a 3 . . . 
            . . . 3 a c . 3 a 3 . c a 3 . . 
            . . 3 a c . 3 a c a 3 . c a 3 . 
            . 3 a c . 3 a c . c a 3 . c a 3 
            . a c . 3 a c . c a 3 . c a 3 . 
            . . . 3 a c . . a 3 . c a 3 . . 
            . . . . 3 a c . 3 . c a 3 . . . 
            . . . . . 3 a c . c a 3 . . . . 
            . . . . . . 3 a c a 3 . . . . . 
            . . . . . . . 3 a 3 . . . . . . 
            . . . . . . . . 3 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . a 3 . . . . . . . 
            . . . . . . . c a 3 . . . . . . 
            . . . . . . 3 . c a 3 . . . . . 
            . . . . . 3 a 3 . c a 3 . . . . 
            . . . . 3 a c a 3 . c a 3 . . . 
            . . . 3 a c . c a 3 . c a 3 . . 
            . . 3 a c . . . c a 3 . c a 3 . 
            . 3 a c . 3 a c . c a 3 . c a 3 
            . . 3 a c . 3 a c a 3 . c a 3 . 
            . . . 3 a c . 3 a 3 . c a 3 . . 
            . . . . 3 a c . 3 . c a 3 . . . 
            . . . . . 3 a c . c a 3 . . . . 
            . . . . . . 3 a c a 3 . . . . . 
            . . . . . . . 3 a 3 . . . . . . 
            . . . . . . . . 3 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . 3 a 3 . . . . . . . 
            . . . . . 3 a c a 3 . . . . . . 
            . . . . 3 a c . c a 3 . . . . . 
            . . . 3 a c . 3 . c a 3 . . . . 
            . . 3 a c . 3 a . . c a 3 . . . 
            . 3 a c . 3 a c . c a 3 . c a . 
            3 a c . 3 a c . c a 3 . c a 3 . 
            . 3 a c . 3 a c a 3 . c a 3 . . 
            . . 3 a c . 3 a 3 . c a 3 . . . 
            . . . 3 a c . 3 . c a 3 . . . . 
            . . . . 3 a c . c a 3 . . . . . 
            . . . . . 3 a c a 3 . . . . . . 
            . . . . . . 3 a 3 . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            `,img`
            . . . . . . . 3 . . . . . . . . 
            . . . . . . 3 a 3 . . . . . . . 
            . . . . . 3 a c a 3 . . . . . . 
            . . . . 3 a c . c a 3 . . . . . 
            . . . 3 a c . 3 . c a 3 . . . . 
            . . 3 a c . 3 a 3 . c a 3 . . . 
            . 3 a c . 3 a c a 3 . c a 3 . . 
            3 a c . 3 a c . c a 3 . c a 3 . 
            . 3 a c . 3 a c . . . c a 3 . . 
            . . 3 a c . 3 a c . c a 3 . . . 
            . . . 3 a c . 3 a c a 3 . . . . 
            . . . . 3 a c . 3 a 3 . . . . . 
            . . . . . 3 a c . 3 . . . . . . 
            . . . . . . 3 a c . . . . . . . 
            . . . . . . . 3 a . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(ExxitDoor, tiles.getTileLocation(7, 1))
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.badProjectile, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(10)
    sfxSpitHit.play()
    playerPlatforms += -1
    platzBar.value += 25
})
function MakeVertPosBar () {
    vertBar = statusbars.create(20, 4, StatusBarKind.Health)
    vertBar.positionDirection(CollisionDirection.Bottom)
    vertBar.setBarSize(0, 4)
    vertBar.setOffsetPadding(0, 3)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.badProjectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(-5)
    music.zapped.play()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    mySprite.destroy()
    game.over(false, effects.splatter)
})
function MakeMySprite () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . 7 7 7 7 7 7 7 . . . 
        . . . . . 7 7 1 1 f 7 7 7 . . . 
        . . . . 7 7 7 1 1 1 7 7 7 7 . . 
        . . . . 7 f 7 7 7 7 7 7 7 7 . . 
        . . . . 7 f f f f f f f f 7 7 . 
        . . . . 7 7 7 2 2 7 7 7 7 . . . 
        . . . 7 7 7 7 7 7 7 . . . . . . 
        . . 7 7 7 7 7 7 7 7 7 . . . . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 . . . 7 7 7 7 . 7 7 7 . 
        . . . 7 7 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e e 7 7 . 7 7 . . . . 
        . . . . . . . c c . c 7 7 . . . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e e 7 7 . 7 7 . . . . 
        . . . . . . . c c . c 7 7 . . . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e 7 7 . . 7 7 7 . . . 
        . . . . . c c 7 7 . c c c . . . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e 7 7 . . 7 7 7 . . . 
        . . . . . c c 7 7 . c c c . . . 
        `],
    333,
    true
    )
    controller.moveSprite(mySprite, 135, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
    info.setLife(5)
}
function MakeLevel () {
    platformCount = 0
    scene.setBackgroundColor(15)
    playerPlatforms = 0
    platzBar.value = 100
    jumpEnergy = 4
    jumpergyBar.value = 100
    keyCount = 0
    keysBar.value = 0
    tiles.setTilemap(tilemap`level2`)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    for (let index = 0; index < 3; index++) {
        rowRandom = randint(10, 85)
        colRandom = randint(0, 15)
        tiles.setTileAt(tiles.getTileLocation(colRandom, rowRandom), assets.tile`myTile3`)
    }
    while (platformCount < 160) {
        rowRandom = randint(5, 95)
        colRandom = randint(0, 15)
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom, rowRandom), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom + 1, rowRandom + 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom - 1, rowRandom - 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom + 1, rowRandom - 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom - 1, rowRandom + 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom + 0, rowRandom - 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom - 0, rowRandom + 1), assets.tile`transparency16`) && tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom, rowRandom - 2), assets.tile`transparency16`)))))))) {
            tiles.setTileAt(tiles.getTileLocation(colRandom, rowRandom), sprites.builtin.oceanDepths1)
            tiles.setWallAt(tiles.getTileLocation(colRandom, rowRandom), true)
        }
        platformCount += 1
    }
}
info.onLifeZero(function () {
    scene.setBackgroundColor(2)
    scene.cameraShake(4, 200)
    music.bigCrash.play()
    game.splash("dang it, ribbit!")
    scene.setBackgroundColor(15)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    info.setLife(5)
})
function MakeBaddies () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        coinToss = randint(1, 10)
        if (coinToss > 5) {
            myEnemy = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Enemy)
            animation.runImageAnimation(
            myEnemy,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 7 7 7 . . . . . . 
                . . . . . 7 7 7 7 7 7 7 . . . . 
                . . . . . 7 f 1 7 f 1 7 . . . . 
                . . . . 7 7 7 7 7 7 7 7 7 . . . 
                . . . 6 6 7 6 6 6 7 7 6 6 . . . 
                . . b b b b b b b 6 6 b b b . . 
                . 3 3 b 3 3 3 3 3 3 3 3 3 b 3 . 
                a a a b a a 3 a a a a 3 a b b a 
                c a a c c a a a c c c a a c c c 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 7 7 7 . . . . . . 
                . . . . . 7 7 7 7 7 7 7 . . . . 
                . . . . . 7 1 f 7 1 f 7 . . . . 
                . . . . 7 7 7 7 7 7 7 7 7 . . . 
                . . . 6 6 7 6 6 6 7 7 6 6 . . . 
                . . b b b b b b b 6 6 b b b . . 
                . 3 3 b 3 3 3 3 3 3 3 3 3 b 3 . 
                a a a b a a 3 a a a a 3 a b b a 
                c a a c c a a a c c c a a c c c 
                `],
            500,
            true
            )
            tiles.placeOnTile(myEnemy, value)
            myEnemy.ay = 333
            myEnemy.startEffect(effects.fire, 200)
        }
    }
}
function MakeJumpergyBar () {
    jumpergyBar = statusbars.create(12, 4, StatusBarKind.Energy)
    jumpergyBar.setLabel("jumpz")
    jumpergyBar.positionDirection(CollisionDirection.Bottom)
    jumpergyBar.setOffsetPadding(-50, 8)
}
function MakeKeyBar () {
    keysBar = statusbars.create(10, 3, StatusBarKind.keys)
    keysBar.value = 0
    keysBar.setLabel("keyz")
    keysBar.positionDirection(CollisionDirection.Top)
    keysBar.setOffsetPadding(0, 5)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.coolRadial, 200)
    info.changeScoreBy(10)
    sfxSpitHit.play()
    playerPlatforms += -1
    platzBar.value += 25
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y <= otherSprite.y) {
        otherSprite.destroy(effects.confetti, 200)
        sprite.vy = -222
        info.changeScoreBy(10)
        sfxSpitHit.play()
        if (jumpEnergy < 4) {
            jumpEnergy += 1
            jumpergyBar.value += 25
        }
    } else {
        otherSprite.destroy()
        info.changeLifeBy(-1)
        music.zapped.play()
    }
})
let hurtBolt: Sprite = null
let enemyTrajectory = 0
let myEnemy: Sprite = null
let coinToss = 0
let colRandom = 0
let rowRandom = 0
let platformCount = 0
let vertBar: StatusBarSprite = null
let ExxitDoor: Sprite = null
let keysBar: StatusBarSprite = null
let keyCount = 0
let playerPlatforms = 0
let platzBar: StatusBarSprite = null
let frogSpit: Sprite = null
let facingLeft = 0
let jumpergyBar: StatusBarSprite = null
let mySprite: Sprite = null
let jumpEnergy = 0
let sfxSpitHit: SoundBuffer = null
let sfxSpit: SoundBuffer = null
game.showLongText("This is Frob... Up is JumpBoost,    B is Spit,    A drops a Plat     Get 3 keys to open exit door", DialogLayout.Center)
let fireBallTime = randint(1000, 5000)
let levelNumber = 0
MakeMySprite()
MakePlatzBar()
MakeJumpergyBar()
MakeVertPosBar()
MakeKeyBar()
MakeLevel()
MakeBaddies()
let sfxJump = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square50), 100, 0, 440)
let sfxFire = soundEffects.createSound(soundEffects.waveNumber(WaveType.Triangle), 150, 330, 0)
sfxSpit = soundEffects.createSound(soundEffects.waveNumber(WaveType.WhiteNoise), 100, 2000, 0)
sfxSpitHit = soundEffects.createSound(soundEffects.waveNumber(WaveType.TunableNoise), 200, 2500, 440, 255, 0)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . . 7 7 . 7 7 e e e e . . . 
            . . . 7 7 c . c c . . . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . . 7 7 . 7 7 e e e e . . . 
            . . . 7 7 c . c c . . . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . 7 7 7 . . 7 7 e e e . . . 
            . . . c c c . 7 7 c c . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . 7 7 7 . . 7 7 e e e . . . 
            . . . c c c . 7 7 c c . . . . . 
            `],
        333,
        true
        )
        facingLeft = 1
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e e 7 7 . 7 7 . . . . 
            . . . . . . . c c . c 7 7 . . . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e e 7 7 . 7 7 . . . . 
            . . . . . . . c c . c 7 7 . . . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e 7 7 . . 7 7 7 . . . 
            . . . . . c c 7 7 . c c c . . . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e 7 7 . . 7 7 7 . . . 
            . . . . . c c 7 7 . c c c . . . 
            `],
        333,
        true
        )
        facingLeft = 0
    }
    vertBar.setLabel(convertToText(Math.round(mySprite.y)))
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -270
        mySprite.startEffect(effects.trail, 150)
        sfxJump.play()
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (!(value.isHittingTile(CollisionDirection.Bottom))) {
            enemyTrajectory = enemyTrajectory * -1
            value.vx = enemyTrajectory
        }
    }
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vy = randint(0, -200)
        value.vx = randint(-20, 20)
        enemyTrajectory = value.vx
    }
})
game.onUpdateInterval(60000, function () {
    MakeBaddies()
})
forever(function () {
    fireBallTime = randint(1000, 7000)
    hurtBolt = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 4 4 4 4 2 2 . . . . 
        . . . . 2 2 4 5 5 4 2 2 . . . . 
        . . . . 2 4 4 5 5 4 4 2 . . . . 
        . . . . 2 4 5 5 5 4 4 2 . . . . 
        . . . . 2 4 5 5 4 4 2 2 . . . . 
        . . . . 2 2 4 5 4 2 2 c . . . . 
        . . . . c 2 4 4 4 2 2 . . . . . 
        . . . . . 2 2 4 2 2 c . . . . . 
        . . . . . c 2 2 2 c . . . . . . 
        `, 0, -74)
    hurtBolt.x = randint(5, 245)
    hurtBolt.setKind(SpriteKind.badProjectile)
    sfxFire.play()
    pause(fireBallTime)
})
