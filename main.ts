scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    platformCount = 0
    scene.setBackgroundColor(5)
    info.changeScoreBy(1000)
    music.beamUp.play()
    game.splash("nice!")
    MakeLevel()
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
            `, mySprite, -222, 10)
    } else {
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
            `, mySprite, 222, 10)
    }
})
function MakePlatzBar () {
    platzBar = statusbars.create(20, 4, StatusBarKind.Energy)
    platzBar.setLabel("platz")
    platzBar.positionDirection(CollisionDirection.Top)
    platzBar.setOffsetPadding(-55, 8)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -270
        mySprite.startEffect(effects.trail, 150)
        music.thump.play()
    }
})
function MakeVertPosBar () {
    vertBar = statusbars.create(20, 4, StatusBarKind.Health)
    vertBar.positionDirection(CollisionDirection.Bottom)
    vertBar.setBarSize(0, 4)
    vertBar.setOffsetPadding(0, 3)
}
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
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 . . 7 . . 
        . . 7 7 7 7 7 7 7 7 7 . . 7 7 . 
        . . 7 7 7 7 7 7 7 7 7 . . . . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
        . . . 7 7 7 7 . . . . 7 7 7 . . 
        . . . . . . . . . . . . . 7 7 . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 . . 7 . . 
        . . 7 7 7 7 7 7 7 7 7 . . 7 7 . 
        . . 7 7 7 7 7 7 7 7 7 . . . . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
        . . . 7 7 7 7 . . . . 7 7 7 . . 
        . . . . . . . . . . . 7 7 7 . . 
        . . . . . . . . . . . . . 7 7 . 
        `],
    333,
    true
    )
    controller.moveSprite(mySprite, 120, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerPlatforms < 3) {
        tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), assets.tile`myTile1`)
        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), true)
        music.knock.play()
        playerPlatforms += 1
        platzBar.value += -33
    }
})
function MakeLevel () {
    scene.setBackgroundColor(15)
    tiles.setTilemap(tilemap`level2`)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
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
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    music.zapped.play()
    info.setLife(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let hurtBolt: Sprite = null
let colRandom = 0
let rowRandom = 0
let vertBar: StatusBarSprite = null
let platzBar: StatusBarSprite = null
let mySprite: Sprite = null
let frogSpit: Sprite = null
let facingLeft = 0
let platformCount = 0
let playerPlatforms = 0
let levelNumber = 0
playerPlatforms = 0
MakeMySprite()
MakeLevel()
MakePlatzBar()
MakeVertPosBar()
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 . . 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 . . . . 7 7 7 7 . . . 
            . 7 7 . . . . . . . . . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 . . 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 . . . . 7 7 7 7 . . . 
            . . 7 7 7 . . . . . . . . . . . 
            . 7 7 . . . . . . . . . . . . . 
            `],
        333,
        true
        )
        facingLeft = 1
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 . . 7 . . 
            . . 7 7 7 7 7 7 7 7 7 . . 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 . . . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . . 7 7 7 . . 
            . . . . . . . . . . . . . 7 7 . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 . . 7 . . 
            . . 7 7 7 7 7 7 7 7 7 . . 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 . . . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . 7 7 7 7 . . . . 7 7 7 . . 
            . . . . . . . . . . . 7 7 7 . . 
            . . . . . . . . . . . . . 7 7 . 
            `],
        333,
        true
        )
    }
    vertBar.setLabel(convertToText(Math.round(mySprite.y)))
})
game.onUpdateInterval(1000, function () {
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
        `, 0, -80)
    hurtBolt.x = randint(10, 240)
    hurtBolt.setKind(SpriteKind.Enemy)
})
